//MARCA LA LOCACION SI CLICKEO EL MAPA

import { useMapEvents } from "react-leaflet";


const MapClickHandler = ({ latitude, longitude }) => {
    const map = useMapEvents({
        click: (e) => {
            console.log('Coordenadas:', e.latlng.lat, e.latlng.lng);
            console.log('Tus coordenadas actuales:', latitude, longitude);
        },
    });
    console.log(map)
    return null;
};

export default MapClickHandler;
