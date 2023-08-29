import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";

export const AuthDetail = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {authUser ? (<><p>{`Signed In as ${authUser.email}`}</p><button onClick={userSignOut}>Sign out</button></>
        
      ) : (
        <button onClick={userSignOut}>Signed out</button>
      )}
    </div>
  );
};

export default AuthDetail;
