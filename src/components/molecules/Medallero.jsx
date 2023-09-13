import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Medals from '../atoms/Medals';
import { db } from '../../firebase/firebaseConfig';

const Medallero = () => {
    const [user, setUser] = useState({});
    const [medal, setMedal] = useState({});
    const [loading, setLoading] = useState(true);


    const fetchUser = async () => {
        const userStorage = sessionStorage.getItem('user');
        const userObject = JSON.parse(userStorage);
        const userEmail = userObject.email;
        const q = query(collection(db, 'users'), where('email', '==', userEmail));

        try {
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            const array = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                array.push(user);
            });
            setUser(array);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los documentos:', error);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        console.log(user);
        setMedal(user[0]?.achievements)
    }, [user]);


    return (
        <div className="w-full h-32 mt-6">
            <h1 className="text-center font-roboto text-2xl font-bold">LOGROS</h1>
            <div className="flex justify-evenly">
                {loading ? (
                    <p>Cargando logros...</p>
                ) : (
                    <div className="flex w-screen justify-evenly">
                        {medal && (
                            <>
                                {Object.keys(medal)
                                    .sort((a, b) => (medal[b].complete - medal[a].complete))
                                    .map((achievementKey) => (
                                        <Medals
                                            key={achievementKey}
                                            achieved={medal[achievementKey].complete}
                                            achievementData={medal[achievementKey]}
                                        />
                                    ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Medallero;
