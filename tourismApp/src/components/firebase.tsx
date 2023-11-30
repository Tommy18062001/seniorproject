// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBisJ453T0CkDKm_GmaahdOPSa22GgTVI8",
  authDomain: "fanilotour.firebaseapp.com",
  projectId: "fanilotour",
  storageBucket: "fanilotour.appspot.com",
  messagingSenderId: "749412848689",
  appId: "1:749412848689:web:a225be09d2a940c30ef110",
  measurementId: "G-MPQE10676Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
