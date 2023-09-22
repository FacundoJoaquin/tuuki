import { useState } from "react";
import Arrow from "../molecules/Arrow";

const SettingsContainer = ({ title, answer, arrow }) => {
    const [showContent, setShowContent] = useState(false);

    const handleShowContent = () => {
      setShowContent(!showContent);
    };
  
    return (
      <div className="px-4">
        <div
          className={`text-xl flex items-center justify-center cursor-pointer dark:bg-yellow-500 ${
            !showContent
              ? "shadow-xl border border-gray-200"
              : "border-t border-l border-r border-gray-200"
          }`}
          onClick={handleShowContent}
        >
          <div className="flex items-center justify-between w-full">{title} {arrow}</div>
        </div>
        <div
          className={`transition-all ease-in-out duration-300 ${
            showContent
              ? "h-auto opacity-100 py-2 expanded border-r border-b border-l shadow-xl border-gray-200"
              : "h-0 opacity-0 py-0 collapsed "
          } overflow-hidden text-center`}
        >
          {answer}
        </div>
      </div>
    );
        }  

export default SettingsContainer
