import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { GetLocation } from "../utils/Functions";
import controlCanino from "../../assets/controlCanino.png";
import controlGendarmeria from '../../assets/controlGendarmeria.png';
import controlAlcohol from '../../assets/controlAlcohol.png'
import tuki from '../../assets/tuki.png'
import controlPapeles from '../../assets/controlPapeles.png'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [pin, setPin] = useState([]);
  const [showState, setShowState] = useState(false);
  const [controlsFetched, setControlsFetched] = useState([])
  async function fetchData() {
    // Obtén la ubicación y actualiza 'location'
    try {
      const loc = await GetLocation();
      setLocation(loc);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      // Maneja el error apropiadamente
    }
  }
  useEffect(() => {
    fetchData(); // Llama a la función para obtener la ubicación
    fetchControls()
  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez


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
    handleCreatePins(controlsFetched)
    setShowState(true)
  }, [controlsFetched])

  useEffect(() => {
    console.log(pin);
  }, [pin])

  const handleCreatePins = (controls) => {
    const mapPin = controls.map((control) => {
      const {
        comment,
        type,
        timeStamp,
        endTime,
        iconUrl,
        latitude,
        longitude
      } = control.createControl;

      // Devolvemos un objeto con los datos del pin
      return {
        geocode: {
          latitude,
          longitude,
        },
        popUp: comment,
        timeStamp,
        endTime,
        type,
        iconUrl,
      };
    });
    setPin([...mapPin])
  }

  const createCustomIcon = (iconUrl) => {
    return new Icon({
      iconUrl: iconUrl,
      iconSize: [40, 40],
    });
  }

  const getIconUrl = (type) => {
    switch (type) {
      case 'controlCanino':
        return controlCanino;
      case 'controlGendarmeria':
        return controlGendarmeria;
      case 'controlAlcohol':
        return controlAlcohol;
      case 'controlPapeles':
        return controlPapeles;
      default:
        return null;
    }
  }

  const renderMarkers = () => {
    const tukiIcon = new Icon({
      iconUrl: tuki,
      iconSize: [120, 150],
    });

    return showState && pin.map((marker, index) => {
      const iconUrl = getIconUrl(marker.type);
      const customIcon = iconUrl ? createCustomIcon(iconUrl) : null;
      
      return (
        <Marker
          key={index}
          position={[marker.geocode.latitude, marker.geocode.longitude]}
          icon={tukiIcon}
        >
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          />
          <Popup>{marker.popUp}</Popup>
        </Marker>
      );
    });
  };
  const [showDefaultLocation, setShowDefaultLocation] = useState(false)
  const showTuki = () => {
    const tukiIcon = new Icon({
      iconUrl: tuki,
      iconSize: [120, 150],
    });
    return (
      <Marker
        key={'1234'}
        position={[location.latitude, location.longitude]}
        icon={tukiIcon}
      >
      </Marker>

    )
  }

  return (
    <div className="z-10 h-full">
      {location.latitude != null && location.longitude != null ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {renderMarkers()}
        </MapContainer>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Map;