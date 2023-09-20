import { useState } from "react"; // Importa useState
import Arrow from "../molecules/Arrow";

const Faqs = () => {
    const [showContent, setShowContent] = useState(false);

    const handleShowContent = () => {
      setShowContent(!showContent);
    };
  return (
    <div className="">
      <div
        className="border shadow-xl text-xl mt-16 flex items-center justify-center cursor-pointer dark:bg-yellow-500"
        onClick={handleShowContent}
      >
        ¿Cómo funciona la aplicación? <Arrow />
      </div>
      <div
        className={`transition-all ease-in-out duration-300 ${
          showContent
            ? "h-auto opacity-100 py-2 expanded"
            : "h-0 opacity-0 py-0 collapsed"
        } overflow-hidden text-center`}
      >
        Tuki toma tu ubicación en tiempo real, el te marcará donde está, si no
        la tienes habilitada, no podrás utilizar la aplicación, por favor no te
        olvides de aceptar los permisos. Una vez que tenga tu ubicación, podrás
        marcar un control de transito en tu ubicación. Igualmente en cada una de
        la vista arriba a la derecha encontrarás un icono que, al clickear, te
        mostrará la información necesaria para la vista.
      </div>
    </div>
  );
};

export default Faqs;
