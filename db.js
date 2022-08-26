// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAwBW0O_OERixoCxNWrrO2x6Pxngynb90A",
  authDomain: "sprintform-3171b.firebaseapp.com",
  projectId: "sprintform-3171b",
  storageBucket: "sprintform-3171b.appspot.com",
  messagingSenderId: "552643556738",
  appId: "1:552643556738:web:a7056e9df41321f6548b9b",
  measurementId: "G-ZB4JRMHJ3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

export {db, storage}