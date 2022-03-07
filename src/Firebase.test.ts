/**
 * @jest-environment node
 */
import fs from 'fs'

// Assuming a Firestore app and the Firestore emulator for this example
import { addDoc, collection, deleteDoc, doc, FieldValue, Firestore, getDoc, getDocs, increment, query, serverTimestamp, setDoc, Timestamp, updateDoc, writeBatch } from "firebase/firestore";

import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import { Comment, User } from './interfaces';

    

let testEnv : RulesTestEnvironment;

beforeAll(async () => {

testEnv = await initializeTestEnvironment({
    projectId: "comment-section-e9c09",
    firestore: {
        rules: fs.readFileSync('firestore.rules', 'utf8'),
        host:'localhost',
        port:1234
    },
});

});

beforeEach(async () => {
    await testEnv.clearFirestore();
})

afterAll(async () => {
    await testEnv.cleanup();
    

})

test("users can only access their own documents", async () => {
    
        const juliusomo_id = "test_user"
        const juliusomo = testEnv.authenticatedContext(juliusomo_id);
        const juliusomo_db = juliusomo.firestore();

        const bob_id = "test_user2"
        const bob = testEnv.authenticatedContext(bob_id);
        const bob_db = bob.firestore()

        // await seedDatabase(juliusomo_id,juliusomo_db)

        const theDoc = doc(juliusomo_db,juliusomo_id,"test")



        await assertSucceeds(setDoc(theDoc,{
          content:'test',
          score:0,
        }))


        await assertSucceeds(updateDoc(theDoc,{
          score:increment(1)
        }))
        await assertSucceeds(updateDoc(theDoc,{
          score:increment(1)
        }))
        await assertFails(updateDoc(theDoc,{
          score:increment(2)
        }))

        await assertFails(updateDoc(theDoc,{
          score:increment(3)
        }))
        await assertSucceeds(updateDoc(theDoc,{
          score:increment(1)
        }))



        await assertFails(getDoc(doc(bob_db,juliusomo_id,"test")))
        // await assertSucceeds(getDoc(doc(juliusomo_db,juliusomo_id,"test")))
        
        

        
})

test.only("users can only increment counter by one", async () => {
  const juliusomo_id = "test_user"
  const juliusomo = testEnv.authenticatedContext(juliusomo_id);
  const juliusomo_db = juliusomo.firestore();

  const theDoc = doc(juliusomo_db,juliusomo_id,"test")

  const comment : Partial<Comment> = {
    createdAt:serverTimestamp(),
    content:"sef",
    score:0,
    parentComment:null,
    hasReplies:false
  }

  await assertSucceeds(setDoc(theDoc,comment))

  await assertSucceeds(updateDoc(theDoc,{
    score:increment(1)
  }))
  await assertSucceeds(updateDoc(theDoc,{
    score:increment(1)
  }))

  await assertFails(updateDoc(theDoc,{
    score:increment(2)
  }))

  await assertSucceeds(updateDoc(theDoc,{
    score:increment(1)
  }))

})




const seedDatabase = async (uid: string,db:any) => {
    const commentsColl = collection(db, uid);
  
    const batch = writeBatch(db);
  
    const user : User ={
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
          userId:uid
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