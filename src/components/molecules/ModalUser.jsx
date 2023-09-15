import MedalAcount from "../../assets/MedalAcount.png"
import FirstPin from "../../assets/FirstPin.png"
import comment from "../../assets/comment.png"
import ExitIcon from "../atoms/ExitIcon.jsx"

const ModalUser = ({handleShowModal}) => {
    return (
        <div className="px-2 relative">
            <div className="absolute right-1 top-1" onClick={handleShowModal}><ExitIcon /></div>
            <h1 className="font-bold text-center text-xl mb-2">¿Que es esto?</h1>
            <p className="text-center">Estos son los datos de tu usuario, aquí podrás encontrar distinto tipo de información cómo los logros que has alcanzado así cómo tu historial personal.</p>
            <p className="text-center font-bold">Vamos a desglosar.</p>
            <ul className="flex flex-col gap-y-3 mt-2">
                <li className="flex items-center gap-2"><img src={MedalAcount} alt="" className="h-8" />Este logro se desbloquea una vez que te creas una cuenta e ingresas por primera vez.</li>
                <li className="flex items-center gap-2"><img src={FirstPin} alt="" className="h-8" />Este logro se desbloquea una vez que marcas un control por primera vez.</li>
                <li className="flex items-center gap-2"><img src={comment} alt="" className="h-8" />Este logro se desbloquea una vez que marcas un control dejando un comentario.</li>
            </ul>
        </div>
    )
}

export default ModalUser