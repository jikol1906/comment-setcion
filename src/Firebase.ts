import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    doc, 
    serverTimestamp, 
    arrayUnion
} from "firebase/firestore";
import { getAuth, signInAnonymously} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import data from './data.json';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1e1eAoc2OPXd3FB3Ba2yMce0FFjIcSfs",
  authDomain: "comment-section-e9c09.firebaseapp.com",
  projectId: "comment-section-e9c09",
  storageBucket: "comment-section-e9c09.appspot.com",
  messagingSenderId: "1012097966004",
  appId: "1:1012097966004:web:32b217849de976843adce1",
  measurementId: "G-9E4QKH0TRM"
};

export const authenticateAnonymously = () => {
    return signInAnonymously(getAuth(app));
};

export const seedDatabase = () => {
    
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);