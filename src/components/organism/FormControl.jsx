import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateControl } from "../redux/features/createControl/createControSlice";
import { handleMarkers } from "../redux/features/pinCreateControl/pinCreateControlSlice";
import ExitIcon from "../atoms/ExitIcon"
import { toggleModal } from "../redux/features/showModal/modalSlice";
import { collection, addDoc, serverTimestamp, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js"
import { updateAchievements } from "../redux/features/achievements/achievementSlice";
import { incrementCounter } from "../redux/features/controlHistory/controlHistorialSlice";

const marker = {
	iconUrl: "",
	type: "",
	comment: "",
	latitude: "",
	longitude: "",
};


const FormControl = () => {
	const [comment, setComment] = useState("");
	const [createControl, setCreateControl] = useState(marker);
	const [selectedType, setSelectedType] = useState(true)
	const [user, setUser] = useState({});
	const dispatch = useDispatch()

	const handleModalClose = () => {
		dispatch(toggleModal());
	};

	const handleControlType = (controlType) => {
		setSelectedType(controlType);
		switch (controlType) {
			case "controlCanino":
				setCreateControl((prevCreateControl) => ({
					...prevCreateControl,
					type: controlType,
					iconUrl: controles[0].controlCanino,
				}));

				break;
			case "controlPapeles":
				setCreateControl((prevCreateControl) => ({
					...prevCreateControl,
					type: controlType,
					iconUrl: controles[0].controlPapeles,
				}));
				break;
			case "controlAlcohol":
				setCreateControl((prevCreateControl) => ({
					...prevCreateControl,
					type: controlType,
					iconUrl: controles[0].controlAlcohol,
				}));
				break;
			case "controlGendarmeria":
				setCreateControl((prevCreateControl) => ({
					...prevCreateControl,
					type: controlType,
					iconUrl: controles[0].controlGendarmeria,
				}));
				break;
			default:
				break;
		}
	};


	const fetchUser = async () => {
		const userStorage = sessionStorage.getItem('user');
		const userObject = JSON.parse(userStorage);
		const userEmail = userObject.email;
		const q = query(collection(db, 'users'), where('email', '==', userEmail));

		try {
			const querySnapshot = await getDocs(q);
			const array = [];
			querySnapshot.forEach((doc) => {
				const user = doc.data();
				array.push(user);
			});
			setUser(array);
		} catch (error) {
			console.error('Error al obtener los documentos:', error);
		}
	};

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;

					setCreateControl((prevCreateControl) => ({
						...prevCreateControl,
						latitude: latitude,
						longitude: longitude,
					}));
				},
				(error) => {
					console.error("Error obteniendo la ubicación:", error);
				}
			);
		} else {
			console.error("Geolocalización no disponible");
		}
		fetchUser()
	}, []);

	const handleInputComment = (event) => {
		const newComment = event.target.value;
		setComment(newComment);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateControl(createControl))
		handlePostControl(createControl);
		dispatch(handleMarkers())
		dispatch(toggleModal())
		dispatch(incrementCounter({ field: createControl.type }));

	};

	useEffect(() => {
		setCreateControl((prevCreateControl) => ({
			...prevCreateControl,
			comment: comment,

		}));
	}, [comment]);

	const controles = [
		{
			controlCanino: "../../src/assets/controlCanino.png",
			controlPapeles: "../../src/assets/controlPapeles.png",
			controlAlcohol: "../../src/assets/controlAlcohol.png",
			controlGendarmeria: "../../src/assets/controlGendarmeria.png",
		},
	];


	const handlePostControl = async () => {
		const createdAt = serverTimestamp();
		const achievementsToUpdate = {};
		let updateNeeded = false;

		if (createControl) {
			// Actualiza firstControl solo si no estaba completo
			if (!user[0]?.achievements.firstControl.complete) {
				achievementsToUpdate['achievements.firstControl.complete'] = true;
				updateNeeded = true;
				dispatch(updateAchievements({
					firstControl: {
						complete: true,
						key: "firstControl",
					}
				}));
			}

			// Actualiza firstComment si existe un comentario y no estaba completo
			if (createControl.comment && !user[0]?.achievements.firstComment.complete) {
				achievementsToUpdate['achievements.firstComment.complete'] = true;
				updateNeeded = true;
				dispatch(updateAchievements({
					firstComment: {
						complete: true,
						key: "firstComment",
					}
				}));
			}

			// Si se necesita una actualización, actualiza el usuario en Firestore
			if (updateNeeded) {
				await updateDoc(doc(db, "users", user[0].id), achievementsToUpdate);
			}
		}

		// PUSHEA EL CONTROL A FIRESTORE
		const docRef = await addDoc(collection(db, "controles"), {
			createControl,
			timeStamp: createdAt,
			userId: user[0]?.id,
		});

		console.log("Document written with ID: ", docRef.id);
	};

	return (
		<div className="z-50 flex flex-col items-end h-full py-5 w-full">
			<div className="relative bottom-3 right-2" onClick={handleModalClose}>
				<ExitIcon />
			</div>
			<form className="w-full h-full flex flex-col" onSubmit={(e) => handleSubmit(e)}>
				<div className="flex flex-col justify-center">
					<h3 className="text-lg text-center font-bold">CONFIRMAR CONTROL</h3>
					<div className="flex justify-around">
						<label className="relative">
							<input
								type="radio"
								name="controles"
								value="controlCanino"
								checked={createControl === "controlCanino"}
								onChange={() => handleControlType("controlCanino")}
								className="hidden"
							/>
							{selectedType === "controlCanino" &&
								<div className="z-10 absolute bg-red-500 top-0 left-0 h-10 w-10 rounded-full " />}
							<img
								src={controles[0].controlCanino}
								alt="controlCanino"
								className="w-10 z-30 relative"
							/>
						</label>
						<label className="relative">
							<input
								type="radio"
								name="controles"
								value="controlPapeles"
								checked={createControl === "controlPapeles"}
								onChange={() => handleControlType("controlPapeles")}
								className="hidden"
							/>
							{selectedType === "controlPapeles" &&
								<div className="z-10 absolute bg-red-500 top-0 left-0 h-10 w-10 rounded-full " />}
							<img
								src={controles[0].controlPapeles}
								alt="controlPapeles"
								className="w-10 z-30 relative"
							/>
						</label>
						<label className="relative">
							<input
								type="radio"
								name="controles"
								value="controlAlcohol"
								checked={createControl === "controlAlcohol"}
								onChange={() => handleControlType("controlAlcohol")}
								className="hidden"
							/>
							{selectedType === "controlAlcohol" &&
								<div className="z-10 absolute bg-red-500 top-0 left-0 h-10 w-10 rounded-full " />}
							<img
								src={controles[0].controlAlcohol}
								alt="controlAlcohol"
								className="w-10 z-30 relative"
							/>
						</label>
						<label className="relative">
							<input
								type="radio"
								name="controles"
								value="controlGendarmeria"
								checked={createControl === "controlGendarmeria"}
								onChange={() => handleControlType("controlGendarmeria")}
								className="hidden"
							/>
							{selectedType === "controlGendarmeria" &&
								<div className="z-10 absolute bg-red-500 top-0 left-0 h-10 w-10 rounded-full " />}
							<img
								src={controles[0].controlGendarmeria}
								alt="controlGendarmeria"
								className="w-10 z-30 relative"
							/>
						</label>
					</div>
				</div>
				<div className="flex flex-col items-center mt-2">
					<h3 className="text-lg text-center font-bold">Comentario</h3>
					<textarea rows={3}
						className="h-24 w-2/3 p-2 rounded-xl my-2 border border-gray-200 shadow-lg"
						onChange={handleInputComment}
					>

					</textarea>
					<button type="submit" className="w-2/3 bg-red-500 py-1 m-2 rounded border border-gray-300 text-white">Enviar</button>
				</div>
			</form>
		</div>
	);
};

export default FormControl;
