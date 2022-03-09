import {
  getFirestore,
  query,
  onSnapshot,
  collection,
  getDocs,
  doc,
  QuerySnapshot,
  DocumentData,
  FirestoreError,
  writeBatch,
  where,
  Timestamp,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { connectAuthEmulator, getAuth, signInAnonymously } from "firebase/auth";
import { connectFunctionsEmulator,httpsCallable,getFunctions } from "firebase/functions";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { User } from "./interfaces";

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

export const seedDatabase = async (uid: string) => {
  const commentsColl = collection(db, uid);

  const batch = writeBatch(db);

  const user : User ={
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
  }

  const q = query(commentsColl);

  const snap = await getDocs(q);

  if (snap.empty) {
    batch.set(doc(commentsColl), {
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: Timestamp.now(),
      score: 12,
      user,
      parentComment: null,
      hasReplies: false,
    });

    const docWithReplies = doc(commentsColl);

    batch.set(docWithReplies, {
      content: "A comment that has some replies",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
        userId:"123"
      },
      parentComment: null,
      hasReplies: true,
    });

    batch.set(doc(commentsColl), {
      content: "A comment that has some replies",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
        userId:"234"
      },
      parentComment: docWithReplies.id,
      hasReplies: false,
    });

    batch.set(doc(commentsColl), {
      content: "I agree lol",
      createdAt: "1 month ago",
      score: 12,
      user,
      parentComment: docWithReplies.id,
      hasReplies: false,
    });
  }

  await batch.commit();
};

function getCurrentUserCommentsCollection(uid: string) {
  return collection(db, uid);
}

export const addComment = async (content:string) => {
  const addComment = httpsCallable<({content:string})>(functions,"addComment");
  await addComment({content})
}

export const subscribeRootComments = (
  uid: string,
  next: (snapshot: QuerySnapshot<DocumentData>) => void | undefined,
  error?: ((error: FirestoreError) => void) | undefined
) => {
  const commentsColl = collection(db, uid);
  const commentsQuery = query(commentsColl, where("parentComment", "==", null));
  return onSnapshot(commentsQuery, { next, error });
};

export const getReplies = (uid: string, parentCommentId: string) => {
  const commentsColl = getCurrentUserCommentsCollection(uid);

  return getDocs(
    query(commentsColl, where("parentComment", "==", parentCommentId))
  );
};
