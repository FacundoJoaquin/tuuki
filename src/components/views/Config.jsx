import ChangePassword from "../molecules/ChangePassword";
import ThemeSwitcher from "../atoms/ThemeSwitcher";
import BannerSettings from "../atoms/BannerSettings";
import Faqs from "../atoms/Faqs";
import Feedback from "../molecules/Feedback";
import SettingsContainer from "../molecules/SettingsContainer";
import { useState } from "react";
import Arrow from "../molecules/Arrow";

const Config = () => {
  const [isArrowRotated, setIsArrowRotated] = useState(false);

  const handleContainerClick = () => {
    setIsArrowRotated(!isArrowRotated);
  };

  return (
    <div className="h-full w-screen dark:bg-nmate-950	overflow-y-hidden ">
      <BannerSettings />
      <div className="flex flex-col gap-y-8 mt-6">
        <div onClick={handleContainerClick} >
          <SettingsContainer
            title="¿Cómo funciona la aplicación?"
            answer={<Faqs />}
          />
        </div>
        <div onClick={handleContainerClick}>
          <SettingsContainer
            title="Desea cambiar la contraseña"
            answer={<ChangePassword />}
          />
        </div>
        <div onClick={handleContainerClick}>
          <SettingsContainer
            title="Feedback"
            answer={<Feedback />}
          />{" "}
        </div>

        <div onClick={handleContainerClick}>
          <SettingsContainer
            title="Cambiar tema"
            answer={<ThemeSwitcher />}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Config;
