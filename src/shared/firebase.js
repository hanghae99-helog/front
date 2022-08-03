// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6xeweyk32j0mHDDWpuMtg9QGlMP-Kz3o",
  authDomain: "helog-66aa5.firebaseapp.com",
  projectId: "helog-66aa5",
  storageBucket: "helog-66aa5.appspot.com",
  messagingSenderId: "85223218346",
  appId: "1:85223218346:web:5dcfec6d7febc165d244d3",
  measurementId: "G-W999BBH0GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;