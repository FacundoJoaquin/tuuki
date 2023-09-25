import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import controlCanino from "../../assets/controlCanino.png";
import controlGendarmeria from '../../assets/controlGendarmeria.png';
import controlAlcohol from '../../assets/controlAlcohol.png';
import controlPapeles from '../../assets/controlPapeles.png';

const RenderControls = ({ data }) => {
  const [controls, setControls] = useState([]);

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
    handleCreatePins(data);
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
