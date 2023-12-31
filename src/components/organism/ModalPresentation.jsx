import tuki from "../../assets/tuki1.png";
import controlCanino from "../../assets/controlCanino.png"
import controlPapeles from "../../assets/controlPapeles.png"
import controlAlcohol from "../../assets/controlAlcohol.png"
import controlGendarmeria from "../../assets/controlGendarmeria.png"
import ExitIcon from "../atoms/ExitIcon";


const ModalPresentation = ({closeModalExplenation}) => {
    return (
        <div className="relative dark:bg-nmate-950 ">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={closeModalExplenation}>
                <ExitIcon />
            </div>
            <div className="flex flex-col items-center p-2 dark:border dark:border-nmate-500 ">
                <img src={tuki} className="h-12 w-8" alt="" />
                <p className="text-center dark:text-white">
                    <strong>Hola, soy Tuki.</strong> Mi objetivo es marcar tu ubicación y ayudarte. <br />
                    Acá podrás ver todos los controles que han sido marcados en los últimos 30 minutos, cada control tiene un icono distintivo según el tipo de control que sea
                </p>
                <p className="font-bold dark:text-white">Los controles son los siguientes</p>
                <ul className="flex flex-col w-full gap-y-2 mt-1">
                    <li className="flex ml-2 dark:text-white"><img src={controlPapeles} alt="" className="w-8 mr-2 " />Control de papeles</li>
                    <li className="flex ml-2 dark:text-white"><img src={controlAlcohol} alt="" className="w-8 mr-2 " />Control de alcoholemia</li>
                    <li className="flex ml-2 dark:text-white"><img src={controlCanino} alt="" className="w-8 mr-2 " />Control con canes</li>
                    <li className="flex ml-2 dark:text-white"><img src={controlGendarmeria} alt="" className="w-8 mr-2 " />Control de gendarmería</li>
                </ul>
            </div>
        </div>
    );
};

export default ModalPresentation;
