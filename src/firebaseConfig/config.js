import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA02BZebmwOpO-Bi7yEGeZIVAQhY-mIeHY",
    authDomain: "assesment-accb6.firebaseapp.com",
    projectId: "assesment-accb6",
    storageBucket: "assesment-accb6.firebasestorage.app",
    messagingSenderId: "749399081988",
    appId: "1:749399081988:web:b1e613afff5deec9ade151",
    measurementId: "G-F8YC73MM65"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);