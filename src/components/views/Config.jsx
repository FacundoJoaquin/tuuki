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
    <div className="h-screen w-screen dark:bg-slate-800 overflow-y-hidden">
      <BannerSettings />
      <div className="flex flex-col gap-y-8 mt-6">
        <div onClick={handleContainerClick} >
          <SettingsContainer
            title="¿Cómo funciona la aplicación?"
            answer={<Faqs />}
            arrow={<Arrow rotate={isArrowRotated ? "" : "rotate-180"} />}
          />
        </div>
        <div onClick={handleContainerClick}>
          <SettingsContainer
            title="Desea cambiar la contraseña"
            answer={<ChangePassword />}
            arrow={<Arrow rotate={isArrowRotated ? "" : "rotate-180"} />}
          />
        </div>
        <div onClick={handleContainerClick}>
          <SettingsContainer
            title="Feedback"
            answer={<Feedback />}
            arrow={<Arrow rotate={isArrowRotated ? "" : "rotate-180"} />}
          />{" "}
        </div>

        <div onClick={handleContainerClick}>
          <SettingsContainer
            title="Cambiar tema"
            answer={<ThemeSwitcher />}
            arrow={<Arrow rotate={isArrowRotated ? "" : "rotate-180"} />}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Config;
