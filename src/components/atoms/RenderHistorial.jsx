import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import controlCanino from '../../assets/controlCanino.png'
import controlAlcohol from '../../assets/controlAlcohol.png'
import controlGendarmeria from '../../assets/controlGendarmeria.png'
import controlPapeles from '../../assets/controlPapeles.png'
import { useDispatch, useSelector } from 'react-redux';
import { gotoLocation } from '../redux/features/gotoLocation/gotoLocationSlice';
import { userLocation } from '../redux/features/userLocation/userLocationSlice';

const getImageSource = (type) => {
    switch (type) {
        case 'controlCanino':
            return controlCanino;
        case 'controlAlcohol':
            return controlAlcohol;
        case 'controlGendarmeria':
            return controlGendarmeria;
        case 'controlPapeles':
            return controlPapeles;
        default:
            return '';
    }
}

const location = {
    latitude: 0,
    longitude: 0
}



const RenderHistorial = ({ data }) => {
    const [parsedHours, setParsedHours] = useState([]);
    const userLocation = useSelector((state) => state.userLocationSlice);
    const dispatch = useDispatch()


    const handleSetLocationRedux = (control) => {
        location.latitude = control.createControl.latitude;
        location.longitude = control.createControl.longitude;
        dispatch(gotoLocation(location))
    };

    useEffect(() => {
        const hourPromises = data.map((control) => control.parsedHour);
        Promise.all(hourPromises)
            .then((hours) => {
                setParsedHours(hours);
            })
            .catch((error) => {
            });
    }, [data]);

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }


    const maxDistance = 40;

    const dataFilter = data.filter(objeto => {
        const distancia = haversineDistance(
            userLocation.latitude, 
            userLocation.longitude,
            objeto.createControl.latitude,
            objeto.createControl.longitude
        );
        return distancia <= maxDistance;
    });


    return (
        <>
            {dataFilter && dataFilter.length > 0 && dataFilter.map((control, index) => (
                <div key={index} className='flex items-center justify-center gap-x-6 my-2'>
                    <img src={getImageSource(control.createControl.type)} alt={control.type} className='w-8' />
                    <p className='text-xl font-bold '>{parsedHours[index]}</p>
                </div>
            ))}
        </>
    )
}


RenderHistorial.propTypes = {
    data: PropTypes.array.isRequired,
};

export default RenderHistorial

