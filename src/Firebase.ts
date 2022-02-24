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
    arrayUnion,
    setDoc,
    QuerySnapshot,
    DocumentData,
    FirestoreError,
    writeBatch
} from "firebase/firestore";
import { getAuth, signInAnonymously} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import data from './data.json';

const firebaseConfig = {
  apiKey: "AIzaSyB1e1eAoc2OPXd3FB3Ba2yMce0FFjIcSfs",
  authDomain: "comment-section-e9c09.firebaseapp.com",
  projectId: "comment-section-e9c09",
  storageBucket: "comment-section-e9c09.appspot.com",
  messagingSenderId: "1012097966004",
  appId: "1:1012097966004:web:32b217849de976843adce1",
  measurementId: "G-9E4QKH0TRM"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const authenticateAnonymously = () => {
    return signInAnonymously(getAuth(app));
};

export const seedDatabase = async (uid:string) => {
    
    const commentsColl = collection(db,uid)

    // // Get a new write batch
    const batch = writeBatch(db);



    const q = query(commentsColl);

    const snap = await getDocs(q)

    if(snap.empty) {
        data.comments.forEach(async(c) => {
            batch.set(doc(commentsColl),c,{merge:true})
        })
    } 

    await batch.commit();
}

export const subscribeComments = 
        (uid:string,
        next:(snapshot: QuerySnapshot<DocumentData>) => void | undefined,
        error?: ((error: FirestoreError) => void) | undefined
        ) => {
    const commentsColl = collection(db,uid)
    const commentsQuery = query(commentsColl,orderBy("createdAt"))
    return onSnapshot(commentsQuery,{next,error})
}