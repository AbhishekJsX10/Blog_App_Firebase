// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOQh4payYNFRXBW2huBp0akdoeaQ0sUak",
  authDomain: "reactjs-bloggingwebsite.firebaseapp.com",
  projectId: "reactjs-bloggingwebsite",
  storageBucket: "reactjs-bloggingwebsite.appspot.com",
  messagingSenderId: "156731379953",
  appId: "1:156731379953:web:f78f9544537c3ae4975950"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

