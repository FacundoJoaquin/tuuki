import { getAuth, updatePassword } from "firebase/auth";
import { useState } from "react";
import Arrow from "./Arrow";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Contraseña actualizada con éxito");
        })
        .catch((error) => {
          console.error("Error al actualizar la contraseña", error);
        });
    } else {
      console.error("Usuario no autenticado");
    }
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="border shadow-xl">
      <div
        className="text-xl flex items-center justify-center cursor-pointer dark:bg-yellow-500"
        onClick={handleShowForm}
      >
        ¿Desea modificar su contraseña? <Arrow />
      </div>
      <div
        className={`transition-all ease-in-out duration-300 ${
          showForm ? "h-auto opacity-100 py-2" : "h-0 opacity-0 py-0"
        } overflow-hidden`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={newPassword}
            onChange={handlePasswordChange}
            className="border mx-14 border-gray-400 py-1 shadow-xl rounded-lg mb-3"
          />
          <button className="bg-red-500 w-min p-1 text-white rounded-lg">Confirmar</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
