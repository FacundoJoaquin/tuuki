import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import iconUrl from "../../assets/tuki.png";

//FORM CONTROLS

const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [pin, setPin] = useState({});
  const [showState, setShowState] = useState(false);

  /*   const handleSetPin = () => {
    if (location.latitude != null && location.longitude != null) {
      setPin([{ geocode: [location.latitude, location.longitude], popUp: "Acá estamos pa" }]);
      setShowState(!showState);
    }
  }
 */ const customIcon = new Icon({
    iconUrl: iconUrl,
    iconSize: [134, 150],
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Agrega el marcador automáticamente cuando obtienes la ubicación
          setPin([{ geocode: [latitude, longitude], popUp: "asdasd" }]);
          setShowState(true);

          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("Geolocalización no disponible");
    }
  }, []);



  return (
    <div className="z-10 h-full">
      {location.latitude != null && location.longitude != null ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {showState
            ? pin.map((marker, index) => (
              <Marker
                key={index}
                icon={customIcon}
                position={marker.geocode ? marker.geocode : [0, 0]}
              >
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))
            : null}
        </MapContainer>
      ) : (
        <p>Cargando...</p>
      )}
    </div>

  );
};

export default Map;
