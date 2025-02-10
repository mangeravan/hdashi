// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBULwWiKr0OpioTOKjjBl56-Qb1A6-QjLY",
  authDomain: "devashhd.firebaseapp.com",
  databaseURL: "https://devashhd-default-rtdb.firebaseio.com",
  projectId: "devashhd",
  storageBucket: "devashhd.firebasestorage.app",
  messagingSenderId: "513606163980",
  appId: "1:513606163980:web:524b9cceb0547fa4005829",
  measurementId: "G-F36JRY91XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const realTiemDB = getDatabase(app)
