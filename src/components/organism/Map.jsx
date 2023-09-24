import "leaflet/dist/leaflet.css";
import "./map.css";
import Modal from "./Modal";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { GetLocation } from "../utils/Functions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import RenderLocation from "../atoms/RenderLocation";
import RenderControls from "../atoms/RenderControls";
import { control } from "leaflet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pinCreateControlFalse } from "../redux/features/pinCreateControl/pinCreateControlSlice";
import check from "../../assets/check.png";
import MapClickHandler from "../molecules/MapClickHandler";
import { userLocation } from "../redux/features/userLocation/userLocationSlice";

const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [controlsFetched, setControlsFetched] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [shouldRenderLocation, setShouldRenderLocation] = useState(false);
  const [modal, setModal] = useState(false);
  const pinCreateControl = useSelector((state) => state.pinCreateControl);
  const createControl = useSelector((state) => state.createControl);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("pinCreateControl", pinCreateControl);
    // Obtén un array de los valores contenidos en el objeto
    const values = Object.values(pinCreateControl);
    // Verifica si algún valor en el array es igual a true
    const isPinCreateControlTrue = values.includes(true);

    if (isPinCreateControlTrue) {
      console.log("entramos");
      setModal(true);
    }
  }, [pinCreateControl]);

  async function getAndSetLocation() {
    try {
      const location = await GetLocation();
      setLocation(location);
      dispatch(userLocation(location))
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  }

  const fetchControls = async () => {
    const now = new Date();
    const halfHour = new Date(now.getTime() - 30 * 60000);
    //TRAE DE FIRESTORE LOS CONTROLES
    const q = query(
      collection(db, "controles"),
      where("timeStamp", ">", halfHour)
    );
    try {
      const querySnapshot = await getDocs(q);
      const controlesArray = [];
      querySnapshot.forEach((doc) => {
        const controlData = doc.data();
        controlesArray.push(controlData);
      });
      setControlsFetched(controlesArray);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

  

  useEffect(() => {
    const fetchCordenates = { latitude: 0, longitude: 0 };
    const array = [];
    controlsFetched.forEach((element) => {
      fetchCordenates.latitude = element.createControl.latitude;
      fetchCordenates.longitude = element.createControl.longitude;
      array.push(fetchCordenates);
    });
    setCoordinates(array);
  }, [controlsFetched]);

  useEffect(() => {
    const shouldRenderLocation = !coordinates.some(
      (coord) =>
        coord.latitude === location.latitude &&
        coord.longitude === location.longitude
    );

    setShouldRenderLocation(shouldRenderLocation);
  }, [coordinates, location]);

  useEffect(() => {
    getAndSetLocation();
    fetchControls();
  }, []);

  const handleCloseModal = () => {
    fetchControls();
    setModal(false);
    dispatch(pinCreateControlFalse());
    setShouldRenderLocation(false);
  };

  return (
    <div className="z-10 h-full w-full ">
      {location.latitude !== null && location.longitude !== null ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          className="z-10"
        >
                      <MapClickHandler />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {shouldRenderLocation ? <RenderLocation location={location} /> : null}
          <RenderControls data={controlsFetched} />
        </MapContainer>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="">
            <p className="font-barriecito text-7xl font-semibold text-center dark:text-white">
              UPS!
            </p>
            <p className=" dark:text-white">Algo salió mal y no pudimos acceder a tu ubicación</p>
          </div>
        </div>
      )}
      {modal && (
        <Modal>
          <div className="h-48 text-center flex flex-col items-center justify-evenly">
            <img src={check} alt="" />
            <p className="text-2xl font-bold dark:text-nmate-200">¡Control añadido con éxito!</p>
            <button
              onClick={handleCloseModal}
              className="h-8 w-16 bg-gradient-to-t from-red-500 to-orange-400 text-white rounded-xl"
            >
              Ok
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Map;
