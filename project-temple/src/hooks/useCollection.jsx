import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, c);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [c]);

  return { documents };

  //   const [documents, setDocuments] = useState(null);
  //   const [error, setError] = useState(null);
  //   // if we dont use a ref --> infinite loop in useEffect
  //   // _query is an array and is "different" on every function call
  //   const query = useRef(_query).current;
  //   const orderBy = useRef(_orderBy).current;
  //   useEffect(() => {
  //     let ref = db.collection(collection);
  //     if (query) {
  //       ref = ref.where(...query);
  //     }
  //     if (orderBy) {
  //       ref = ref.orderBy(...orderBy);
  //     }
  //     const unsuscribe = ref.onSnapshot(
  //       (snapshot) => {
  //         let results = [];
  //         snapshot.docs.forEach((doc) => {
  //           results.push({ ...doc.data(), id: doc.id });
  //         });
  //         //update state
  //         setDocuments(results);
  //         setError(null);
  //       },
  //       (error) => {
  //         console.log(error);
  //         setError("Could not fetch the data.");
  //       }
  //     );
  //     //unsuscribe on unmount
  //     return () => unsuscribe();
  //   }, [collection, query, orderBy]);
  //   return { documents, error };
};
