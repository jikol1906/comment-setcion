    import * as functions from "firebase-functions";
    import * as admin from "firebase-admin";

    admin.initializeApp()

    const db = admin.firestore()


    exports.createUser = functions.auth.user().onCreate(async user => {

      const batch = db.batch()

      batch.create(db.collection("users").doc(user.uid), {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      })
      .create(db.collection("comments").doc(),{
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: admin.firestore.Timestamp.now(),
        score: 12,
        parentComment: null,
        hasReplies: false,
        userId:user.uid,
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
          userId:"342",
          commentThreadOwner:user.uid
      })

      batch.create(db.collection("comments").doc(),{
          content:
            "lorem ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: commentWithReplies.id,
          hasReplies: false,
          userId:"342",
          commentThreadOwner:user.uid
      })

      batch.create(db.collection("comments").doc(),{
          content:
            "lorem ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: commentWithReplies.id,
          hasReplies: false,
          userId:"342",
          commentThreadOwner:user.uid
      })

    await batch.commit()

    })
