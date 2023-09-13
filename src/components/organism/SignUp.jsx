import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { Link } from "react-router-dom"; // Import useHistory
import { db } from "../../firebase/firebaseConfig.js"
import { addDoc, collection } from "firebase/firestore";

const achievements = {
	firstLogin: {
		complete: true,
		key: 'firstLogin'
	},
	firstControl: {
		complete: false,
		key: 'firstControl'
	},
	firstComment: {
		complete: false,
		key: 'firstComment'
	}
}

const SignUp = () => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	const setUserDoc = async (email) => {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				achievements: achievements,
				email: email,
			});
			console.log('Usuario creado:', docRef.id);
		} catch (error) {
			console.error('Error al crear el usuario:', error);
		}
	}


	const SignUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, user, password)
			.then((userCredential) => {
				const userEmail = userCredential.user.email;
				setUserDoc(userEmail);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex justify-center items-center w-screen h-full flex-col">
			<div className="h-1/3 rounded-2xl w-4/5 flex items-center justify-center border border-lw-200 shadow-xl">
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
					<button type="submit" className="relative top-2 border-t border-l border-b-red-400 border-b border-r px-3 border-red-600 bg-red-400 rounded-t-lg text-white">Crear</button>
				</form>
			</div>
			<Link className="absolute right-0 bottom-12 text-sm text-red-500 font-bold font-roboto" to="/login" >
				¡Ya tengo una cuenta!
			</Link>
		</div>
	);
};
export default SignUp;
