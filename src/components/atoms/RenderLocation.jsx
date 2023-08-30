import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import tuki from "../../assets/tuki.png";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const RenderLocation = ({ location }) => {
    const pinCreateControl = useSelector((state) => state.pinCreateControl);
    const [handleMarker, setHandleMarker] = useState(pinCreateControl)
    const tukiIcon = new Icon({
        iconUrl: tuki,
        iconSize: [120, 150],
    });
    const tukiText = '¡Hola, soy Tuki!. Esta es tu ubicación actual';

    useEffect(() => { 
        setHandleMarker(pinCreateControl)
        
    }, [pinCreateControl])

    useEffect(()=>{
        if(handleMarker == false){
            return null
        }
    },[handleMarker])

    return (
            <Marker
                key={'123123123412412'}
                position={[location.latitude, location.longitude]}
                icon={tukiIcon}
            >
                <Popup>{tukiText}</Popup>
            </Marker>

    )
}
RenderLocation.propTypes = {
    location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
};

export default RenderLocation;