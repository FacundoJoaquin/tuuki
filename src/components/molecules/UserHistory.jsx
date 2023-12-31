import controlCanino from "../../assets/controlCanino.png";
import controlPapeles from "../../assets/controlPapeles.png";
import controlGendarmeria from "../../assets/controlGendarmeria.png";
import controlAlcohol from "../../assets/controlAlcohol.png";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setCounters } from "../redux/features/controlHistory/controlHistorialSlice";

const controlsCounter = {
    controlCanino: 0,
    controlPapeles: 0,
    controlGendarmeria: 0,
    controlAlcohol: 0,
};

const UserHistory = () => {
    const dispatch = useDispatch()
    const globalControlCounts = useSelector((state) => state.controlHistorial);

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
        const hasReduxValues = Object.values(globalControlCounts).some((count) => count > 0);
        if (hasReduxValues == false) {
            fetchControls();
        }
    }, [globalControlCounts]);


    useEffect(() => {
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

        const hasValues = Object.values(newControlCounts).some((count) => count > 0);

        if (hasValues) {
            dispatch(setCounters(newControlCounts));
        }
    }, [controls, dispatch]);

    return (
        <div className="mt-20 flex justify-center xs:h-1/3 xxs:mt-14">
            <div className="h-full w-4/5 flex flex-col justify-betweem dark:bg-nmate-800 shadow-xl p rounded-t-2xl rounded-b-2xl  xxs:h-52 xs:overflow-y-auto xs:mt-8 xxs:mt-0 ">
                <div>
                    <h1 className="text-center text-2xl text-white rounded-t-2xl border-b-white bg-red-500 xs:text-xl dark:bg-nmate-800 dark:border-b-2 dark:border-nmate-950 dark:py-1">
                        Historial de controles
                    </h1>
                </div>

                <div className="h-full flex flex-col justify-center ">
                    <div className="flex justify-between px-12 mt-2 items-center xs:mt-1 ">
                        <img src={controlPapeles} alt="" className="h-10 xs:h-8" />
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">Papeles</p>
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">{controlCounts.controlPapeles || globalControlCounts.controlPapeles}</p>
                    </div>

                    <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                        <img src={controlAlcohol} alt="" className="h-10 xs:h-8" />
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">Alcoholemia</p>
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">{controlCounts.controlAlcohol || globalControlCounts.controlAlcohol}</p>
                    </div>

                    <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                        <img src={controlCanino} alt="" className="h-10 xs:h-8" />
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">Caninos</p>
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">{controlCounts.controlCanino || globalControlCounts.controlCanino}</p>
                    </div>

                    <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                        <img src={controlGendarmeria} alt="" className="h-10 xs:h-8" />
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">Gendarmeria</p>
                        <p className="text-xl xs:text-md xxs:text-sm dark:text-white">{controlCounts.controlGendarmeria || globalControlCounts.controlGendarmeria}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserHistory;
