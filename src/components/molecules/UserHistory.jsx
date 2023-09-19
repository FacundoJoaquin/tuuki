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
        console.log('se fetchean los controles');
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
    // Verifica si ya tienes valores asignados en el estado de Redux
    const hasReduxValues = Object.values(globalControlCounts).some((count) => count > 0);
    console.log(hasReduxValues);
    if (hasReduxValues == false) {
      // Si no tienes valores en Redux, entonces fetchea los datos
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
        <div className="mt-20 flex justify-center xs:h-1/3">
            <div className="h-full w-4/5 border border-gray-300 shadow-xl rounded-t-2xl rounded-b-2xl">
                <div>
                    <h1 className="text-center text-2xl text-white rounded-t-2xl border-b-white bg-red-500 ">
                        Historial de controles
                    </h1>
                </div>
                
                <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                    <img src={controlPapeles} alt="" className="h-10 xs:h-8" />
                    <p className="text-xl xs:text-md">Papeles</p>
                    <p className="text-xl xs:text-md">{controlCounts.controlPapeles || globalControlCounts.controlPapeles}</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                    <img src={controlAlcohol} alt="" className="h-10 xs:h-8" />
                    <p className="text-xl xs:text-md">Alcoholemia</p>
                    <p className="text-xl xs:text-md">{controlCounts.controlAlcohol || globalControlCounts.controlAlcohol}</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                    <img src={controlCanino} alt="" className="h-10 xs:h-8" />
                    <p className="text-xl xs:text-md">Caninos</p>
                    <p className="text-xl xs:text-md">{controlCounts.controlCanino || globalControlCounts.controlCanino}</p>
                </div>

                <div className="flex justify-between px-12 mt-2 items-center xs:mt-1">
                    <img src={controlGendarmeria} alt="" className="h-10 xs:h-8" />
                    <p className="text-xl xs:text-md">Gendarmeria</p>
                    <p className="text-xl xs:text-md">{controlCounts.controlGendarmeria || globalControlCounts.controlGendarmeria}</p>
                </div>

            </div>
        </div>
    );
};

export default UserHistory;
