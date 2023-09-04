import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { GetLocation } from "../utils/Functions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import RenderLocation from "../atoms/RenderLocation";
import RenderControls from "../atoms/RenderControls";

const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [controlsFetched, setControlsFetched] = useState([])

  async function getAndSetLocation() {
    // Obtén la ubicación y actualiza 'location'
    try {
      const location = await GetLocation();
      setLocation(location);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      // Maneja el error apropiadamente
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
    getAndSetLocation(); // Llama a la función para obtener la ubicación
    fetchControls()

  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez



  return (
    <div className="z-10 h-screen w-full">
      {location.latitude !== null && location.longitude !== null ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RenderLocation location={location} />
          <RenderControls data={controlsFetched}/>
        </MapContainer>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Map;