import AddComment from "./Components/AddComment/AddComment";
import useComments from "./useComment";
import CommentList from "./Components/CommentList";
import * as FirestoreService from "./Firebase";
import { useEffect, useState } from "react";
import { signInAnonymously, User } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseApp } from "./Firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
function App() {

  const [user, loading, error] = useAuthState(auth);
  
  
  useEffect(() => {
    signInAnonymously(auth).then(async u => {
      
      await setDoc(doc(FirestoreService.db,"users",u.user.uid),{
        username:'juliomoso',
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
      })

      await FirestoreService.seedDatabase(u.user.uid)
      
    })
  },[])
 
  
  return (
    <div className="grid gap-2 p-2 max-w-4xl mx-auto py-20">
      {user && <CommentList/>}
    </div>
  );
}

export default App;
