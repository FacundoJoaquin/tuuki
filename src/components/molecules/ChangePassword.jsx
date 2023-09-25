import { getAuth, updatePassword } from "firebase/auth";
import { useState } from "react";
import Modal from "../organism/Modal";
import Check from "../../assets/check.png"

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [modal, setModal] = useState(false)
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
          setModal(true)
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
        type="password"
        value={newPassword}
        onChange={handlePasswordChange}
        className="border mx-14 border-gray-400 py-1 shadow-xl rounded-lg mb-3"
      />
      <button className="bg-red-500 w-min p-1 text-white rounded-lg">Confirmar</button>
      {modal && (<Modal>
        <div className="flex flex-col items-center justify-center gap-y-4 py-4">
          <img src={Check} alt="" />
          <p className="text-xl font-black">¡Contraseña actualizada con éxito!</p>
          <button onClick={() => setModal(!modal)} className="h-10 w-20 bg-gradient-to-t from-red-600 to-orange-400 text-white rounded-xl">Continuar</button>
        </div>
      </Modal>)}
    </form>

  );
};

export default ChangePassword;
