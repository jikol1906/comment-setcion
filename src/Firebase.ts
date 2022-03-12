import {
  getFirestore,
  connectFirestoreEmulator,
  DocumentReference,
} from "firebase/firestore";
import { connectAuthEmulator, getAuth, signInAnonymously } from "firebase/auth";
import { connectFunctionsEmulator,httpsCallable,getFunctions } from "firebase/functions";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB1e1eAoc2OPXd3FB3Ba2yMce0FFjIcSfs",
  authDomain: "comment-section-e9c09.firebaseapp.com",
  projectId: "comment-section-e9c09",
  storageBucket: "comment-section-e9c09.appspot.com",
  messagingSenderId: "1012097966004",
  appId: "1:1012097966004:web:32b217849de976843adce1",
  measurementId: "G-9E4QKH0TRM",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);


if(window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth,"http://localhost:9099")
}

export const authenticateAnonymously = () => {
  return signInAnonymously(getAuth(firebaseApp));
};

export const addComment = (content:string,replyingTo:string|null) => {
  const addComment = httpsCallable<{content:string,replyingTo:string|null},DocumentReference<{content:string}>>(functions,"addComment");
  return addComment({content,replyingTo:replyingTo || null});
}

export const deleteComment = (commentId:string) => {
  const deleteComment = httpsCallable<({commentId:string})>(functions,"deleteComment");
  return deleteComment({commentId})
}

export const updateComment = (commentId:string,content:string) => {
  const updateComment = httpsCallable<({commentId:string,content:string})>(functions,"updateComment");
  return updateComment({commentId,content})
}


