import React from "react";
import controlCanino from "../../assets/controlCanino.png";
import controlPapeles from "../../assets/controlPapeles.png";
import controlGendarmeria from "../../assets/controlGendarmeria.png";
import controlAlcohol from "../../assets/controlAlcohol.png";
const UserHistory = () => {
    return (
        <div className="mt-20 flex justify-center">
            <div className="h-full w-4/5 border border-gray-300 shadow-md rounded-t-2xl rounded-b-2xl">
                <div>
                    <h1 className="text-center text-2xl text-white rounded-t-2xl border-b-white bg-red-500">
                        Historial de controles
                    </h1>
                </div>
                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlCanino} alt="" className="h-10" />
                    <p className="text-xl">Caninos</p>
                    <p className="text-xl">0</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlPapeles} alt="" className="h-10" />
                    <p className="text-xl">Papeles</p>
                    <p className="text-xl">0</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlGendarmeria} alt="" className="h-10" />
                    <p className="text-xl">Gendarmeria</p>
                    <p className="text-xl">0</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlAlcohol} alt="" className="h-10" />
                    <p className="text-xl">Alcoholemia</p>
                    <p className="text-xl">0</p>
                </div>
            </div>
        </div>
    );
};

export default UserHistory;
