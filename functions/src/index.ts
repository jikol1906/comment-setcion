    import * as functions from "firebase-functions";
    import * as admin from "firebase-admin";  

    admin.initializeApp()

    const db = admin.firestore()


    exports.createUser = functions.auth.user().onCreate(async user => {

      const batch = db.batch()


 
      batch.create(db.collection("comments").doc(),{
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: admin.firestore.Timestamp.now(),
        score: 12,
        parentComment: null,
        hasReplies: false,
        userId:"juli",
        commentThreadOwner:user.uid
      })

      const commentWithReplies = db.collection("comments").doc();

      batch.create(commentWithReplies,{
          content:
            "loreum ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: null,
          hasReplies: true,
          user:{
            image: {
              png: "./images/avatars/image-maxblagun.png",
              webp: "./images/avatars/image-maxblagun.webp",
            },
            username: "maxblagun",
          },
          commentThreadOwner:user.uid
      })

      batch.create(db.collection("comments").doc(),{
          content:
            "lorem ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: commentWithReplies.id,
          hasReplies: false,
          user:{
            image: {
              png: "./images/avatars/image-amyrobson.png",
              webp: "./images/avatars/image-amyrobson.webp",
            },
            username: "amyrobson",
          },
          commentThreadOwner:user.uid
      })

      batch.create(db.collection("comments").doc(),{
          content:
            "lorem ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: commentWithReplies.id,
          hasReplies: false,
          user:{
            image: {
              png: "./images/avatars/image-amyrobson.png",
              webp: "./images/avatars/image-amyrobson.webp",
            },
            username: "amyrobson",
          },
          commentThreadOwner:user.uid
      })

    await batch.commit()

    })

    exports.addComment = functions.https.onCall((data,{auth}) => {      
      if (auth) {
        const {content} = data;
        return admin.firestore().collection("comments").add({
          content,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          score: 0,
          parentComment: null,
          hasReplies: false,
          user:{
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          commentThreadOwner:auth.uid
      })
    } else {
        throw new functions.https.HttpsError("unauthenticated", "You must be authenticated");
    }
})
