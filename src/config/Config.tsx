// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjEeni2ifZTw-FDqqhp82KXaFp2Vk50Tk",
  authDomain: "proyectoapp2-57b95.firebaseapp.com",
  projectId: "proyectoapp2-57b95",
  storageBucket: "proyectoapp2-57b95.appspot.com",
  messagingSenderId: "335383896484",
  appId: "1:335383896484:web:8c4b4b01555f14d158e131"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app);
export const auth = getAuth(app);