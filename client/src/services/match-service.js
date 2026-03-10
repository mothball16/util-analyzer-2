
/*
communicates with firebase functions to get filtered data from a match
*/


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjBdTcPy-M619idWz9NQPcv-0SvHvw8lg",
  authDomain: "utilanalyzer.firebaseapp.com",
  projectId: "utilanalyzer",
  storageBucket: "utilanalyzer.firebasestorage.app",
  messagingSenderId: "76887110280",
  appId: "1:76887110280:web:a0d5a2178f733df65b653d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// emulator debugging
connectFunctionsEmulator(functions, "localhost", 5001);

export const fetchMatchData = httpsCallable(functions, "fetchMatchData");

export default app;