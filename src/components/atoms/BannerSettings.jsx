import React, { useState } from "react";
import ImageIcon from "../atoms/ImageIcon";
import ny from "../../assets/ny.jpg";
import tuki from "../../assets/tuki1.png";

const BannerSettings = () => {

  return (
    <div className="w-screen h-32 flex items-center relative overflow-x-hidden xs:h-28 dark:bg-slate-800">
      <div className="h-20 w-20 rounded-full bg-white ml-8 overflow-hidden flex items-center border border-opacity-90 border-gray-200 shadow-xl dark:bg-slate-500 dark:border-slate-700">
        <img src={tuki} alt="" className="p-4" />
      </div>
      <h1 className=" text-interfaz-700 text-2xl text-center ml-8 font-extrabold dark:text-gray-300">
        CONFIGURACIONES
      </h1>
      <div className="absolute bg-interfaz-200 h-1 opacity-40 w-full ml-32 bottom-0 shadow-2xl" />

    </div>
  );
};

export default BannerSettings;
