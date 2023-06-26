import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const docRef = doc(db, collectionName, id);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setDocument(null);
          setError("No such document exists.");
        }
      },
      (error) => {
        console.log(error.message);
        setError("Could not get the data");
      }
    );

    return () => unsubscribe();
  }, [collectionName, id]);

  return { document, error };
};
