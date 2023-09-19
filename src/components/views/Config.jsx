import ChangePassword from "../molecules/ChangePassword";
import ImageIcon from "../atoms/ImageIcon";
import ny from "../../assets/ny.jpg";
import tuki from "../../assets/tuki1.png";
import { useState } from "react"; // Importa useState


const Config = () => {
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <div className="h-screen w-screen">
      <div className="h-1/3 relative w-screen flex justify-center">
        <img src={ny} alt="" className="blur-sm grayscale" />
        <div
          className={`h-40 w-40 absolute -bottom-12 rounded-full flex items-center justify-center border border-stone-100 shadow-xl hover:bg-gray-300 hover:bg-opacity-80 ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)} // Manejar hover
          onMouseLeave={() => setIsHovered(false)} // Manejar hover
        >
          <img src={tuki} alt="" className={`h-36 w-30 ${isHovered ? 'blur' : ''}`} />
          {isHovered && <div className="absolute"><ImageIcon /></div>}
        </div>
      </div>
      <div className="mt-16"><ChangePassword /></div>
    </div>
  );
};

export default Config;
