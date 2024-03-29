import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQQGKPl8i4BRuOkfORQPfWyIfYX6P7IOc",
  authDomain: "project-management-web-a-5a8fe.firebaseapp.com",
  projectId: "project-management-web-a-5a8fe",
  storageBucket: "project-management-web-a-5a8fe.appspot.com",
  messagingSenderId: "278602035689",
  appId: "1:278602035689:web:41ff4510c0e16b97441b78",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

// init firebase storage
const storage = getStorage();

// timestamp
const timestamp = Timestamp;

export { db, auth, storage, timestamp };
