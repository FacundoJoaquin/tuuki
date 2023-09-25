import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Modal from "../organism/Modal";

const Feedback = () => {
  const [feedback, setFeedback] = useState("")
  const [user, setUser] = useState({})
  const [modal, setModal] = useState(false)


  useEffect(() => {
    const userFromStorage = sessionStorage.getItem("user");
    const user = JSON.parse(userFromStorage);
    setUser(user);
  }, [])


  const handlePost = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "feedback"), {
      user: user.email,
      feedback: feedback
    });
    setModal(true)
  };

  return (
    <>
      <p>
        ¡Muchas gracias por haber entrado a mi aplicación! Valoraría mucho si me
        dejas un comentario de feedback para poder mejorar mi aplicación y
        también, mejorar yo como programador.
      </p>
      <form onSubmit={handlePost} className="flex flex-col items-center gap-y-1 mt-2">
        <input type="text" className="border rounded-md border-gray-500" value={feedback} onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="bg-red-500 w-16 p-1 text-white rounded-lg">Enviar</button>
      </form>
      {modal ? (<Modal>
        <div className="h-36 flex flex-col items-center gap-y-2 justify-center">
          <p className="text-3xl">¡Muchas gracias!</p>
          <p>Tu comentario me ayuda a seguir progresando.</p>
          <button className="bg-red-500 w-36 px-2 p-1 text-white rounded-lg" onClick={() => setModal(false)}>Continuar</button>
        </div>
      </Modal>) : null}
    </>
  );
};

export default Feedback;
