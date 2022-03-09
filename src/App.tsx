import AddComment from "./Components/AddComment/AddComment";
import useComments from "./useComment";
import CommentList from "./Components/CommentList";
import * as FirestoreService from "./Firebase";
import { useEffect, useState } from "react";
import { connectAuthEmulator, signInAnonymously, User } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firebaseApp } from "./Firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import Loadingspinner from "./Components/Loadingspinner/Loadingspinner";

function App() {

  const [user] = useAuthState(auth);
  
  
  useEffect(() => {
    signInAnonymously(auth)
  },[])
 
  
  return (
    <div className="grid gap-2 p-2 max-w-4xl mx-auto py-20">
      {!user ? <Loadingspinner/> : <CommentList/>}
    </div>
  );
}

export default App;
