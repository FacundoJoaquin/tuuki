import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { Link } from "react-router-dom"; // Import useHistory


const SignUp = () => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	const SignUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, user, password)
			.then((userCredential) => {
				console.log(userCredential);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex justify-center items-center h-full flex-col">
			<div className="h-1/3 w-2/3 rounded-2xl flex items-center justify-center border border-lw-200 shadow-xl">
				<form className="flex justify-center items-center flex-col gap-y-3" onSubmit={SignUp}>
					<h1 className="font-roboto text-xl">Crea tu cuenta</h1>
					<input
						type="text"
						value={user}
						onChange={(e) => setUser(e.target.value)}
						placeholder="Pone tu email"
						className=" border pl-1 w-44 border-gray-300 rounded outline-none focus:none"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Pone tu pass"
						className=" border pl-1 w-44 border-gray-300 rounded outline-none focus:none"
					/>
					<button type="submit" className="relative top-2 border-t border-l border-b-red-400 border-b border-r px-3 border-red-600 bg-red-400 rounded-t-lg text-white">Log In</button>
				</form>
			</div>
			<Link className="absolute right-0 bottom-12 text-sm text-red-500 font-bold font-roboto" to="/login" >
				¡Ya tengo una cuenta!
			</Link>
		</div>
	);
};
export default SignUp;
