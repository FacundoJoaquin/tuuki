import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import controlCanino from '../../assets/controlCanino.png'
import controlAlcohol from '../../assets/controlAlcohol.png'
import controlGendarmeria from '../../assets/controlGendarmeria.png'
import controlPapeles from '../../assets/controlPapeles.png'
import SeeIcon from './SeeIcon';
import { useDispatch } from 'react-redux';
import { gotoLocation } from '../redux/features/gotoLocation/gotoLocationSlice';

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
                console.error("Error", error);
            });
    }, [data]);



    return (
        <>
            {data && data.length > 0 && data.map((control, index) => (
                <div key={index} className='flex items-center justify-around my-2'>
                    <img src={getImageSource(control.createControl.type)} alt={control.type} className='w-8' />
                    <p className='text-xl font-bold '>{parsedHours[index]}</p>
                    <SeeIcon handleSetLocationRedux={handleSetLocationRedux} control={control} />
                </div>
            ))}

        </>
    )
}

RenderHistorial.propTypes = {
    data: PropTypes.array.isRequired,
};

export default RenderHistorial

