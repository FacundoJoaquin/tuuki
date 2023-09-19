import ChangePassword from "../molecules/ChangePassword";
import { useState } from "react"; // Importa useState
import ThemeSwitcher from "../atoms/ThemeSwitcher";
import BannerSettings from "../atoms/BannerSettings";
import Arrow from "../molecules/Arrow";

const Config = () => {
  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
    setShowContent(!showContent);
  };
  return (
    <div className="h-screen w-screen">
      <ThemeSwitcher />
      <BannerSettings />
      <div className="mt-16">
        <ChangePassword />
      </div>
      <div className="border shadow-xl">
        <div
          className="text-xl mt-6 flex items-center justify-center cursor-pointer dark:bg-yellow-500"
          onClick={handleShowContent}
        >
          ¿Cómo funciona la aplicación? <Arrow />
        </div>
        <div
          className={`transition-all ease-in-out duration-300 ${
            showContent ? "h-auto opacity-100 py-2" : "h-0 opacity-0 py-0"
          } overflow-hidden`}
        >
          Tuki toma tu ubicación en tiempo real, el te marcará donde está, si no
          la tienes habilitada, no podrás utilizar la aplicación, por favor no
          te olvides de aceptar los permisos. Una vez que tenga tu ubicación,
          podrás marcar un control de transito en tu ubicación.
        </div>
      </div>
    </div>
  );
};

export default Config;
