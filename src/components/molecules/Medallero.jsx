import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Medals from '../atoms/Medals';
import { db } from '../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setfirstReadAchievements, updateAchievements } from '../redux/features/achievements/achievementSlice';

const Medallero = () => {
    const [user, setUser] = useState({});
    const [medal, setMedal] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const initialAchievementState = useSelector(state => state.achievement);



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
            setLoading(false);

            const userAchievements = array[0]?.achievements;
            if (userAchievements) {
                const updatedAchievements = {
                    ...userAchievements,
                };
                dispatch(updateAchievements(updatedAchievements));
            }

        } catch (error) {
            console.error('Error al obtener los documentos:', error);
        }
        finally {
            dispatch(setfirstReadAchievements(true))
        }
    };

    useEffect(() => {
        if (user[0]) {
            const userId = user[0]?.id
            sessionStorage.setItem('userId', userId)
        }
    }, [user])


    useEffect(() => {
        if (initialAchievementState && initialAchievementState.firstReadAchievements == false) {
            fetchUser();
            setMedal(user[0]?.achievements);
        } else {
            setLoading(false)
            setMedal(initialAchievementState?.achievements);
        }
    }, [initialAchievementState]);


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
