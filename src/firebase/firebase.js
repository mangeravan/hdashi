// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlQEqjoE8iFeJKEhib42PkB75s2J70DXI",
  authDomain: "dev-hd-3e587.firebaseapp.com",
  projectId: "dev-hd-3e587",
  storageBucket: "dev-hd-3e587.firebasestorage.app",
  messagingSenderId: "53669660380",
  appId: "1:53669660380:web:3b792a72a1230b5d9f9619"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const realTiemDB = getDatabase(app)
