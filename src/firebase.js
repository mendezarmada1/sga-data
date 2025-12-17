import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB7AOsqde-_9icp2S8ej9Y3dbaeuzt-Q2w",
    authDomain: "sga-data.firebaseapp.com",
    projectId: "sga-data",
    storageBucket: "sga-data.firebasestorage.app",
    messagingSenderId: "132011235006",
    appId: "1:132011235006:web:923054a378fc846c4a30ef",
    measurementId: "G-K6N7WD6EQ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
