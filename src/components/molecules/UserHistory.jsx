import controlCanino from "../../assets/controlCanino.png";
import controlPapeles from "../../assets/controlPapeles.png";
import controlGendarmeria from "../../assets/controlGendarmeria.png";
import controlAlcohol from "../../assets/controlAlcohol.png";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const controlsCounter = {
    controlCanino: 0,
    controlPapeles: 0,
    controlGendarmeria: 0,
    controlAlcohol: 0,
};

const UserHistory = () => {
    const [controls, setControls] = useState([]);
    const [controlCounts, setControlCounts] = useState(controlsCounter);

    const fetchControls = async () => {
        let userId = sessionStorage.getItem("userId");
        const q = query(collection(db, "controles"), where("userId", "==", userId));

        try {
            const querySnapshot = await getDocs(q);
            const array = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                array.push(user);
            });
            setControls(array);
        } catch (error) {
            console.error("Error al obtener los documentos:", error);
        }
    };

    useEffect(() => {
        fetchControls();
        const newControlCounts = {
            controlCanino: 0,
            controlPapeles: 0,
            controlGendarmeria: 0,
            controlAlcohol: 0,
        };

        controls.forEach((control) => {
            newControlCounts[control.createControl.type]++;
        });

        setControlCounts((prevControlCounts) => ({
            ...prevControlCounts,
            ...newControlCounts,
        }));
    }, [controls]);

    return (
        <div className="mt-20 flex justify-center">
            <div className="h-full w-4/5 border border-gray-300 shadow-xl rounded-t-2xl rounded-b-2xl">
                <div>
                    <h1 className="text-center text-2xl text-white rounded-t-2xl border-b-white bg-red-500">
                        Historial de controles
                    </h1>
                </div>
                
                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlPapeles} alt="" className="h-10" />
                    <p className="text-xl">Papeles</p>
                    <p className="text-xl">{controlCounts.controlPapeles}</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlAlcohol} alt="" className="h-10" />
                    <p className="text-xl">Alcoholemia</p>
                    <p className="text-xl">{controlCounts.controlAlcohol}</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlCanino} alt="" className="h-10" />
                    <p className="text-xl">Caninos</p>
                    <p className="text-xl">{controlCounts.controlCanino}</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center">
                    <img src={controlGendarmeria} alt="" className="h-10" />
                    <p className="text-xl">Gendarmeria</p>
                    <p className="text-xl">{controlCounts.controlGendarmeria}</p>
                </div>

            </div>
        </div>
    );
};

export default UserHistory;
