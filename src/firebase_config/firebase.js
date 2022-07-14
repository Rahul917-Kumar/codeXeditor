
import { initializeApp } from "firebase/app";   
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDyB1VAhMqxIWDVPA1Uaqc4JPIzzdvITUM",
  authDomain: "codeeditor-7a770.firebaseapp.com",
  projectId: "codeeditor-7a770",
  storageBucket: "codeeditor-7a770.appspot.com",
  messagingSenderId: "20923903207",
  appId: "1:20923903207:web:7228abd95b77cc29108642",
  measurementId: "G-B5D7722104",
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export{auth  , app , db}