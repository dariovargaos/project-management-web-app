import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

//make and order by createdAt function so projects are displaying in order

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, c);

    // const q = query(ref, orderBy("dueDate", "desc"));

    let q;

    if (c === "projects") {
      q = query(ref, orderBy("dueDate", "desc"));
    } else if (c === "users") {
      q = query(ref, orderBy("displayName", "asc"));
    } else {
      q = ref;
    }

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );
    //unsubscribe on unmount
    return () => unsub();
  }, [c]);

  return { documents, error };
};
