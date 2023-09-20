import ChangePassword from "../molecules/ChangePassword";
import ThemeSwitcher from "../atoms/ThemeSwitcher";
import BannerSettings from "../atoms/BannerSettings";
import Faqs from "../atoms/Faqs";

const Config = () => {

  return (
    <div className="h-screen w-screen dark:bg-slate-800">
      <ThemeSwitcher />
      <BannerSettings />
      <Faqs />
      <div className="mt-6">
        <ChangePassword />
      </div>
    </div>
  );
};

export default Config;
