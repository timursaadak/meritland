// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",  // Don't forget to add the real API Key here
  authDomain: "meritland0.firebaseapp.com",
  projectId: "meritland0",
  storageBucket: "meritland0.firebasestorage.app",
  messagingSenderId: "94140762113",
  appId: "", // Don't forget to add the real App ID here
  measurementId: "G-F89FMLTEHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
