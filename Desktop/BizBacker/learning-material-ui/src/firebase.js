import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhXLlBiOo_bLGUjyEsFqH9EP5L0yrkFl4",
  authDomain: "bizbacker-98022.firebaseapp.com",
  databaseURL: "https://bizbacker-98022-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bizbacker-98022",
  storageBucket: "bizbacker-98022.appspot.com",
  messagingSenderId: "39528083460",
  appId: "1:39528083460:web:78495b0048aa326c728551",
  measurementId: "G-TYJDHHFMVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const databaseURL = firebaseConfig.databaseURL; 
