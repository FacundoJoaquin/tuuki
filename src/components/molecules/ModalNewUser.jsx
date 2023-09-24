import check from "../../assets/check.png"
import ExitIcon from "../atoms/ExitIcon";
import { Link } from "react-router-dom"; // Import useHistory

const ModalNewUser = ({props}) => {

    
    return (
        <div className="h-80 px-1 w-full flex items-center justify-center flex-col gap-y-6 relative">
            <div className="absolute top-2 right-3" onClick={props}>
                <ExitIcon />
            </div>
            <img src={check} alt="" className="h-20" />
            <p className="text-center">
                <span className="text-xl font-bold">¡Tu cuenta ha sido creada con éxito! <br /></span>
                Por favor, a continuación se te pedirá compartir tu ubicación, no rechazes este permiso sino tendrás que modificarlo desde la configuración de tu dispositivo.</p>
                 <Link to="/login" className="text-blue-500 font-black">Clickea aquí para ir a loguearte</Link>
        </div>
    )
}

export default ModalNewUser