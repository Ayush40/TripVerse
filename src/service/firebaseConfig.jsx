// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfxEOjIvool67urlbz-uRDD9PEyYYsb3k",
    authDomain: "tripai-8b39f.firebaseapp.com",
    projectId: "tripai-8b39f",
    storageBucket: "tripai-8b39f.firebasestorage.app",
    messagingSenderId: "160470075562",
    appId: "1:160470075562:web:f274854a01d7c8117428d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
