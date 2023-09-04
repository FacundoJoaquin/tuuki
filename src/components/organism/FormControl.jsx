import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateControl } from "../redux/features/createControl/createControSlice";
import { handleMarkers } from "../redux/features/pinCreateControl/pinCreateControlSlice";
import ExitIcon from "../atoms/ExitIcon"
import { toggleModal } from "../redux/features/showModal/modalSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js"

const marker = {
	iconUrl: "",
	type: "",
	comment: "",
	timeStamp: "",
	latitude: "",
	longitude: "",
};


const FormControl = () => {
	const [comment, setComment] = useState("");
	const [createControl, setCreateControl] = useState(marker);
	const [selectedType, setSelectedType] = useState(true)
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
				console.log("error: Unknown control type");
				break;
		}

	};


	useEffect(() => {

		const createdAt = serverTimestamp();

		console.log(createdAt)
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
		//PUSHEA EL CONTROL A FIRESTORE
		const createdAt = serverTimestamp();
		console.log(createdAt);
		const docRef = await addDoc(collection(db, "controles"), {
			createControl,
			timeStamp: createdAt
		});
		console.log("Document written with ID: ", docRef.id);

	}

	return (
		<div className="z-50 flex flex-col items-end h-full py-5 w-full">
			<div className="relative bottom-3 right-2" onClick={handleModalClose}>
				<ExitIcon />
			</div>
			<form className="w-full" onSubmit={(e) => handleSubmit(e)}>
				<div className="flex flex-col justify-center">
					<h3 className="text-lg text-center font-bold">Tipo de control</h3>
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
					<input
						type="text"
						name=""
						className="w-3/4 h-24 rounded-xl my-2 border border-gray-200 shadow-lg"
						id=""
						onChange={handleInputComment}
					/>
					<button type="submit">Enviar</button>
				</div>
			</form>
		</div>
	);
};

export default FormControl;
