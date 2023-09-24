/* eslint-disable react/jsx-key */
import MapIcon from "../atoms/MapIcon.jsx";
import MapPinIcon from "../atoms/MapPinIcon.jsx";
import SettingsIcon from "../atoms/SettingsIcon.jsx";
import UserLogo from "../atoms/UserLogo.jsx";
import TrophyIcon from "../atoms/TrophyIcon.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleModal } from "../redux/features/showModal/modalSlice.js";

const iconsLeft = [<Link to="/user"><UserLogo /></Link>, <Link to="/map"><MapIcon /></Link>];
const iconsRight = [<Link to="/config"><SettingsIcon /></Link>, <TrophyIcon />, ] ;

const Navbar = () => {
    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch(toggleModal());
    };

    return (
        <nav className="bg-lw-50 z-50 border-t absolute bottom-0 left-0 w-full border-t-interfaz-200 h-12 dark:bg-nmate-900 dark:border-nmate-800 dark:border-t dark:border-0">
            <ul className="flex justify-center items-center h-full gap-6">
                {iconsLeft.map((icon, index) => (
                    <li key={index}>{icon}</li>
                ))}
                <li className="bg-red-500 dark:border-slate-800  border border-interfaz-400 rounded-full p-3 mb-3 relative bottom-1 " onClick={handleModal}>
                    <MapPinIcon />
                </li>
                {iconsRight.map((icon, index) => (
                    <li key={index}>{icon}</li>
                ))}
            </ul>
        </nav>

    );
};


export default Navbar;
