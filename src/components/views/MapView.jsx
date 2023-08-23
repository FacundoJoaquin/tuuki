import Map from '../organism/Map.jsx';
import "leaflet/dist/leaflet.css"
import "../organism/map.css"

const MapView = () => {
    return (
        <div className='h-3/4'>
            <h1 className='p-1 ml-1 font-bold text-xl'>Mapa</h1>
            <div className='h-full w-full px-2'>
                <Map />
            </div>
        </div>
    )
}

export default MapView