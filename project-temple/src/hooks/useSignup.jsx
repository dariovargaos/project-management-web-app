import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useToast } from "@chakra-ui/react";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const toast = useToast();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log("user signed up:", res.user);

      if (!res) {
        throw new Error("Could not complete signup.");
      }

      // upload user thumbnail
      let imgUrl = null;
      if (thumbnail) {
        const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
        const imgRef = ref(storage, uploadPath);
        const uploadTask = uploadBytes(imgRef, thumbnail);
        const uploadSnapshot = await uploadTask;
        imgUrl = await getDownloadURL(uploadSnapshot.ref);
      }

      //add display name to user
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: imgUrl,
      });

      // create a user document
      await setDoc(doc(collection(db, "users"), res.user.uid), {
        online: true,
        displayName: displayName,
        photoURL: imgUrl,
      });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }

      toast({
        title: "Account created.",
        description: "You've successfully created account.",
        status: "success",
        duration: "5000",
        isClosable: true,
      });
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        if (
          err.message.includes("Firebase: Error (auth/email-already-in-use).")
        ) {
          setError(
            "This email address is already in use. Please choose another email."
          );
        } else {
          setError(err.message);
        }
        setIsPending(false);
      }
    }
  };

  //cleanup function
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
