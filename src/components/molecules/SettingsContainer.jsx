import { useState } from "react";

const SettingsContainer = ({ title, answer }) => {
  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="px-4">
      <div
        className={`text-xl flex items-center dark:border-none justify-center  cursor-pointer dark:bg-nmate-900 rounded-3xl dark:text-gray-400 p-3  ${!showContent
            ? "shadow-xl border border-gray-200 "
            : "border-t border-l border-r rounded-b-none border-gray-200"
          }`}
        onClick={handleShowContent}
      >
        <div className="flex items-center justify-between w-full dark:text-white">{title}</div>
      </div>
      <div className={`transition-all ease-in-out duration-300 ${showContent
            ? "h-auto opacity-100 py-2 expanded dark:bg-nmate-900  rounded-b-3xl dark:border-none border-r border-b border-l shadow-xl border-gray-200"
            : "h-0 opacity-0 py-0 collapsed "
          } overflow-hidden text-center`}>
        <div className="dark:text-white">{answer}</div>
      </div>
    </div>
  );
}

export default SettingsContainer
