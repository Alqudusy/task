// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBBFpE2z7bgNIngN_fA4U91D47p9khjkTI",
  authDomain: "task-20a7b.firebaseapp.com",
  projectId: "task-20a7b",
  storageBucket: "task-20a7b.firebasestorage.app",
  messagingSenderId: "935054845199",
  appId: "1:935054845199:web:aeb1d3a8bfd232cbb98a7a",
  measurementId: "G-SMLE75V25V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth();
export const db = getFirestore(app);
