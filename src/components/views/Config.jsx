import { getAuth, updatePassword } from "firebase/auth";
import { useEffect, useState } from "react";

const Config = () => {
  const [newPassword, setNewPassword] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    console.log(newPassword);
  }, [newPassword]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div>
      <p>¿Desea modificar su contraseña?</p>
      <form action="">
        <input
          type="text"
          value={newPassword}
          onChange={handlePasswordChange}
          className="bg-red-500"
        />
      </form>
    </div>
  );
};

export default Config;
