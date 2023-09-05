import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      lpm
      <h1 className="font-barriecito text-4xl">TUKI</h1>
      <div>
        <p className="text-center font-roboto">Te damos la bienvenida a Tuki.</p>
        <p className="text-center py-2 font-roboto">
          <strong> SI BEBISTE NO CONDUZCAS</strong>.
        </p>
        <p className="text-center font-roboto">
          Esta aplicación está diseñada para marcar en el mapa los controles de
          tránsito, de una manera divertida e innovadora.
        </p>
      </div>
      <div className="mt-4 flex">
        <Link to="/login"><p className="font-roboto text-red-500 font-semibold">LOGIN</p></Link>
        <p className="font-roboto font-bold text-gray-400 text-sm mx-6">|</p>
        <p className="font-roboto text-red-500 font-semibold">SIGNUP</p>
      </div>
    </div>
  );
};

export default Welcome;
