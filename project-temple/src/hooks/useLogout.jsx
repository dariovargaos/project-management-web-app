import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      // update online status
      const { uid } = user;
      await updateDoc(doc(db, "users", uid), {
        online: false,
      });

      await signOut(auth);

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

      //update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
        navigate("/");
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
