import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { GetLocation } from "../utils/Functions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import RenderLocation from "../atoms/RenderLocation";
import RenderControls from "../atoms/RenderControls";
import { control } from "leaflet";

const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [controlsFetched, setControlsFetched] = useState([])
  const [coordinates, setCoordinates] = useState([])
  const [shouldRenderLocation, setShouldRenderLocation] = useState(false)
  async function getAndSetLocation() {
    try {
      const location = await GetLocation();
      setLocation(location);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  }

  const fetchControls = async () => {
    const now = new Date();
    const halfHour = new Date(now.getTime() - 30 * 60000)
    //TRAE DE FIRESTORE LOS CONTROLES
    const q = query(
      collection(db, 'controles'),
      where('timeStamp', '>', halfHour)
    );
    try {
      const querySnapshot = await getDocs(q);
      const controlesArray = [];
      querySnapshot.forEach((doc) => {
        const controlData = doc.data();
        controlesArray.push(controlData);
      });
      setControlsFetched(controlesArray);
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
  }

  useEffect(() => {
    const fetchCordenates = { latitude: 0, longitude: 0 }
    const array = []
    controlsFetched.forEach(element => {
      fetchCordenates.latitude = element.createControl.latitude
      fetchCordenates.longitude = element.createControl.longitude
      array.push(fetchCordenates)
    });
    setCoordinates(array)

  }
    , [controlsFetched]);

  useEffect(() => {

    const shouldRenderLocation = !coordinates.some(coord => (
      coord.latitude === location.latitude && coord.longitude === location.longitude
    ));

    setShouldRenderLocation(shouldRenderLocation);
  }, [coordinates, location]);


  useEffect(() => {
    getAndSetLocation();
    fetchControls()

  }, []); 



  return (
    <div className="z-10 h-full w-full">
      {location.latitude !== null && location.longitude !== null ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {shouldRenderLocation ? <RenderLocation location={location} /> : <RenderLocation location={location} />}
          <RenderControls data={controlsFetched} />
        </MapContainer>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Map;