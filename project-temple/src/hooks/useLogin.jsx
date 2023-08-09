import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useToast } from "@chakra-ui/react";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const toast = useToast();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign the user in
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      // update online status
      await updateDoc(doc(db, "users", res.user.uid), {
        online: true,
      });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      toast({
        title: "Logged in.",
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
  };

  //cleanup function
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
