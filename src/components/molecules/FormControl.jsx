import { useEffect, useState } from "react";

const FormControl = () => {
	const marker = {
		iconUrl: "",
		type: "",
		comment: "",
		startTime: "",
		endTime: "",
	};

	const [selectedControl, setSelectedControl] = useState(marker);
	const [comment, setComment] = useState("");

	const handleControlType = (controlType) => {
		switch (controlType) {
			case "controlCanino":
				setSelectedControl((prevSelectedControl) => ({
					...prevSelectedControl,
					type: controlType,
					iconUrl: controles[0].controlCanino,
				}));
				console.log(selectedControl);
				break;
			case "controlPapeles":
				setSelectedControl((prevSelectedControl) => ({
					...prevSelectedControl,
					type: controlType,
					iconUrl: controles[0].controlPapeles,
				}));
				break;
			case "controlAlcohol":
				setSelectedControl((prevSelectedControl) => ({
					...prevSelectedControl,
					type: controlType,
					iconUrl: controles[0].controlAlcohol,
				}));
				break;
			case "controlGendarmeria":
				setSelectedControl((prevSelectedControl) => ({
					...prevSelectedControl,
					type: controlType,
					iconUrl: controles[0].controlGendarmeria,
				}));
				break;
			default:
				console.log('error: Unknown control type')
				break;
		}

		getTimestamp();
	};

	function getTimestamp() {
		const newTime = new Date(); // Obtiene la hora actual

		const currentHour = String(newTime.getHours()).padStart(2, "0");
		const currentMinute = String(newTime.getMinutes()).padStart(2, "0");
		const currentSecond = String(newTime.getSeconds()).padStart(2, "0");
		const startTime = `${currentHour}:${currentMinute}:${currentSecond}`;

		newTime.setMinutes(newTime.getMinutes() + 30);

		const endHour = String(newTime.getHours()).padStart(2, "0");
		const endMinute = String(newTime.getMinutes()).padStart(2, "0");
		const endSecond = String(newTime.getSeconds()).padStart(2, "0");

		const endTime = `${endHour}:${endMinute}:${endSecond}`;

		setSelectedControl((prevSelectedControl) => ({
			...prevSelectedControl, // Mantén todas las propiedades anteriores
			startTime: startTime,
			endTime: endTime,
		}));
	}

	const handleInputComment = (event) => {
		const newComment = event.target.value;
		setComment(newComment);
	};

	useEffect(() => {
		setSelectedControl((prevSelectedControl) => ({
			...prevSelectedControl,
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

	return (
		<form>
			<div className="flex">
				<label>
					<input
						type="radio"
						name="controles"
						value="controlCanino"
						checked={selectedControl === "controlCanino"}
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
						checked={selectedControl === "controlPapeles"}
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
						checked={selectedControl === "controlAlcohol"}
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
						checked={selectedControl === "controlGendarmeria"}
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
			<input
				type="text"
				name=""
				className="w-1/2 bg-red-500"
				id=""
				onChange={handleInputComment}
			/>
		</form>
	);
};

export default FormControl;
