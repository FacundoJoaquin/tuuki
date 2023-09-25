import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const SingIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const userCredentialsJSON = JSON.stringify(userCredential.user);
        sessionStorage.setItem('user', userCredentialsJSON);
        navigate('/map');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center w-screen h-full flex-col">
      <div className="h-1/3 rounded-2xl w-4/5 flex items-center justify-center border border-lw-200 shadow-xl">
        <form className="flex justify-center items-center flex-col gap-y-3" onSubmit={SingIn}>
          <h1 className="font-roboto text-xl">Log in</h1>
          <span className="relative">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="User"
              className=" border pl-1 w-44 border-gray-300 rounded outline-none focus:none"
            />
          </span>
          <span className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border  pl-1 border-gray-300 rounded outline-none focus:none w-44"
            />

          </span>
          <button type="submit" className="relative top-2 border-t border-l border-b-red-400 border-b border-r px-3 border-red-600 bg-red-400 rounded-t-lg text-white">Log In</button>
        </form>
      </div>
      <Link className="absolute right-0 bottom-12 text-sm text-red-500 font-bold font-roboto" to="/signup" >
        No tengo cuenta
      </Link>
    </div>
  );
};
export default SignIn;
