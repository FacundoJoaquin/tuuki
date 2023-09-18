import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import RenderHistorial from "../atoms/RenderHistorial";

const HistorialContainer = () => {

  const [fetch, setFetch] = useState([]);


  const fetchControls = async () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    const q = query(
      collection(db, 'controles'),
      where('timeStamp', '>', threeHoursAgo)
    );
    try {
      const querySnapshot = await getDocs(q);
      const controlesArray = [];
      querySnapshot.forEach((doc) => {
        const controlData = doc.data();
        controlesArray.push(controlData);
      });
      setFetch(controlesArray);

    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
  }



  const parseHours = async (data) => {
    const timestamp = data;
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  const fetchWithParsedHours = fetch.map((item) => {
    const timestamp = item.timeStamp;
    const parsedHour = parseHours(timestamp);
    return { ...item, parsedHour };
  });




  useEffect(() => {
    fetchControls()
  }, [])




  return (
    <div className='w-full flex justify-center z-50 h-2/3 overflow-hidden'>
      <div className=' w-full mx-3 mt-4 rounded-t-xl border border-gray-300 overflow-y-scroll'>
        <div className='text-center font-roboto  text-xl py-1 bg-red-500 text-white'>HISTORIAL</div>
        <RenderHistorial data={fetchWithParsedHours} />
      </div>
    </div>
  )
}

export default HistorialContainer