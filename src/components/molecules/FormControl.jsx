import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateControl } from "../redux/features/createControl/createControSlice";
import ExitIcon from "../atoms/ExitIcon"
import { toggleModal } from "../redux/features/showModal/modalSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js"

const FormControl = () => {
	const dispatch = useDispatch()
	const marker = {
		iconUrl: "",
		type: "",
		comment: "",
		timeStamp: "",
		latitude: "",
		longitude: "",
	};

	const [createControl, setCreateControl] = useState(marker);
	const [comment, setComment] = useState("");



	const handleModalClose = () => {
		dispatch(toggleModal());
	};

	const handleControlType = (controlType) => {
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

					// Agrega el marcador automáticamente cuando obtienes la ubicación
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

	//TIMESTAMP PARA EL POST
/* 	const setTimeStamp = () => {
		const newTime = new Date();

		const currentHour = String(newTime.getHours()).padStart(2, "0");
		const currentMinute = String(newTime.getMinutes()).padStart(2, "0");
		const currentSecond = String(newTime.getSeconds()).padStart(2, "0");
		console.log(newTime)
	} */

	////////////////////////////////

/* 	function getTimestamp() {
		const newTime = new Date();

		const currentHour = String(newTime.getHours()).padStart(2, "0");
		const currentMinute = String(newTime.getMinutes()).padStart(2, "0");
		const currentSecond = String(newTime.getSeconds()).padStart(2, "0");
		const timeStamp = `${currentHour}:${currentMinute}:${currentSecond}`;

		newTime.setMinutes(newTime.getMinutes() + 30);

		const endHour = String(newTime.getHours()).padStart(2, "0");
		const endMinute = String(newTime.getMinutes()).padStart(2, "0");
		const endSecond = String(newTime.getSeconds()).padStart(2, "0");

		const endTime = `${endHour}:${endMinute}:${endSecond}`;

		setCreateControl((prevCreateControl) => ({
			...prevCreateControl,
			timeStamp: timeStamp,
			endTime: endTime,
		}));
	}
 */
	const handleInputComment = (event) => {
		const newComment = event.target.value;
		setComment(newComment);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateControl(createControl))
		handlePostControl(createControl);
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
						<label>
							<input
								type="radio"
								name="controles"
								value="controlCanino"
								checked={createControl === "controlCanino"}
								onChange={() => handleControlType("controlCanino")}
								className="hidden"
							/>
							<img
								src={controles[0].controlCanino}
								alt="controlCanino"
								className="w-10"
							/>
						</label>
						<label>
							<input
								type="radio"
								name="controles"
								value="controlPapeles"
								checked={createControl === "controlPapeles"}
								onChange={() => handleControlType("controlPapeles")}
								className="hidden"
							/>
							<img
								src={controles[0].controlPapeles}
								alt="controlPapeles"
								className="w-10"
							/>
						</label>
						<label>
							<input
								type="radio"
								name="controles"
								value="controlAlcohol"
								checked={createControl === "controlAlcohol"}
								onChange={() => handleControlType("controlAlcohol")}
								className="hidden"
							/>
							<img
								src={controles[0].controlAlcohol}
								alt="controlAlcohol"
								className="w-10"
							/>
						</label>
						<label>
							<input
								type="radio"
								name="controles"
								value="controlGendarmeria"
								checked={createControl === "controlGendarmeria"}
								onChange={() => handleControlType("controlGendarmeria")}
								className="hidden"
							/>
							<img
								src={controles[0].controlGendarmeria}
								alt="controlGendarmeria"
								className="w-10"
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
