import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();
  const toast = useToast();

  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    if (user.isAnonymous) {
      try {
        await signOut(auth);

        dispatch({ type: "LOGOUT" });

        if (!isCancelled) {
          setError(null);
          setIsPending(false);
          navigate("/");
        }

        toast({
          title: "Logged out.",
          status: "success",
          duration: "3000",
          isClosable: true,
        });
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setIsPending(false);
        }
      }
    } else {
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

        toast({
          title: "Logged out.",
          status: "success",
          duration: "5000",
          isClosable: true,
        });
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setIsPending(false);
        }
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
