// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC43sq-QmgD5U4VAdTSwExv06FTIeBMErg",
  authDomain: "goglobal2021-2775b.firebaseapp.com",
  databaseURL: "https://goglobal2021-2775b-default-rtdb.firebaseio.com",
  projectId: "goglobal2021-2775b",
  storageBucket: "goglobal2021-2775b.appspot.com",
  messagingSenderId: "968166290653",
  appId: "1:968166290653:web:740a6c9ea87f028b281734",
  measurementId: "G-CS75SP4K1X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage(app);
