import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import iconUrl from "../../assets/tuki.png";
import { useSelector } from "react-redux";
import { GetLocation } from "../utils/Functions";
import controlCanino from "../../assets/controlCanino.png";
import controlGendarmeria from '../../assets/controlGendarmeria.png';
import controlAlcohol from '../../assets/controlAlcohol.png'
import controlPapeles from '../../assets/controlPapeles.png'

const marker = {
  geocode: {
    latitude: '',
    longitude: '',
  },
  popUp: '',
  startTime: '',
  endTime: '',
  iconUrl: ''
}
let customIcon
const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [pin, setPin] = useState([marker]);
  const [showState, setShowState] = useState(false);
  const getControlRedux = useSelector(state => state.createControl);
  console.log(getControlRedux);
  useEffect(() => {
    setPin([{
      geocode: {
        latitude: getControlRedux.latitude,
        longitude: getControlRedux.longitude,
      },
      popUp: getControlRedux.comment,
      startTime: getControlRedux.startTime,
      endTime: getControlRedux.endTime,
    }]);

    switch (getControlRedux.type) {
      case 'controlCanino':
        customIcon = new Icon({
          iconUrl: controlCanino,
          iconSize: [40, 40],
        });
        setShowState(true);
        break;
      case 'controlGendarmeria':
        customIcon = new Icon({
          iconUrl: controlGendarmeria,
          iconSize: [40, 40],
        });
        setShowState(true);
        break;
      case 'controlAlcohol':
        customIcon = new Icon({
          iconUrl: controlAlcohol,
          iconSize: [40, 40],
        });
        setShowState(true);
        break;
      case 'controlPapeles':
        customIcon = new Icon({
          iconUrl: controlPapeles,
          iconSize: [40, 40],
        });
        setShowState(true);
        break;

      default:
        break;
    }
  }, [getControlRedux])

  useEffect(() => {
    console.log(pin);
  }, [pin])

  useEffect(() => {
    // Obtén la ubicación y actualiza 'location' y 'pin'
    async function fetchData() {
      try {
        const loc = await GetLocation();
        setLocation(loc);
        setShowState(true);
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        // Maneja el error apropiadamente
      }
    }

    fetchData(); // Llama a la función para obtener la ubicación

  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez

  return (
    <div className="z-10 h-full">
      {location.latitude != null && location.longitude != null ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {showState && pin && customIcon &&
            pin.map((marker, index) => (
              <Marker
                key={index}
                icon={customIcon}
                position={[marker.geocode.latitude, marker.geocode.longitude]}
              >
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
        </MapContainer>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Map;
