import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import controlCanino from "../../assets/controlCanino.png";
import controlGendarmeria from '../../assets/controlGendarmeria.png';
import controlAlcohol from '../../assets/controlAlcohol.png';
import controlPapeles from '../../assets/controlPapeles.png';

const RenderControls = ({ data }) => {
  const [controls, setControls] = useState([]);
  useEffect(() => {
    console.log(data);
  },[data])
  const handleCreatePins = (controlsData) => {
    const mapPins = controlsData.map((control, index) => {
      const {
        comment,
        type,
        latitude,
        longitude
      } = control.createControl;

      const iconUrl = getIconUrl(type);
      const customIcon = iconUrl ? createCustomIcon(iconUrl) : null;

      return (
        <Marker
          key={index}
          position={[latitude, longitude]}
          icon={customIcon}
        >
          <Popup>{comment}</Popup>
        </Marker>
      );
    });
    setControls(mapPins);
  };

  useEffect(() => {
    // Verificar si data es un array
    if (!Array.isArray(data)) {
      // Si no es un array, crear un nuevo array con data como único elemento
      handleCreatePins([data]);
    } else {
      // Si es un array, llamar a handleCreatePins con data directamente
      handleCreatePins(data);
    }
  }, [data]);
  
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
  };

  const createCustomIcon = (iconUrl) => {
    return new Icon({
      iconUrl: iconUrl,
      iconSize: [40, 40],
    });
  };

  return controls;
};

export default RenderControls;
