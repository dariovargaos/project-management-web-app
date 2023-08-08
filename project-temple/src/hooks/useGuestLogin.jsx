import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";
import { signInAnonymously } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

export const useGuestLogin = () => {
  const [guestError, setGuestError] = useState(null);
  const [isGuestPending, setIsGuestPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const toast = useToast();

  const guestLogin = async () => {
    setGuestError(null);
    setIsGuestPending(true);

    try {
      const res = await signInAnonymously(auth);

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsGuestPending(false);
        setGuestError(null);
      }

      toast({
        title: "Logged in as guest.",
        description: "You have limited access to the app.",
        status: "info",
        duration: "5000",
        isClosable: true,
      });
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setGuestError(err.message);
        setIsGuestPending(false);
      }
    }
  };
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { guestLogin, guestError, isGuestPending };
};
