import { getAuth, updatePassword } from "firebase/auth";
import { useState } from "react";
import Arrow from "./Arrow";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");

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


  return (

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={newPassword}
            onChange={handlePasswordChange}
            className="border mx-14 border-gray-400 py-1 shadow-xl rounded-lg mb-3"
          />
          <button className="bg-red-500 w-min p-1 text-white rounded-lg">Confirmar</button>
        </form>

  );
};

export default ChangePassword;
