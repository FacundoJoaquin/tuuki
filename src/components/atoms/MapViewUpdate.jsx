import { useMap } from "react-leaflet";
import PropTypes from 'prop-types';

const MapViewUpdater = ({ location }) => {
  const map = useMap();

  map.setView([location.latitude, location.longitude], 76);

  return null;
};

MapViewUpdater.propTypes = {
    location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
};

export default MapViewUpdater;
