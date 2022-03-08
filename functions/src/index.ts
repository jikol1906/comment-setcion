    import * as functions from "firebase-functions";
    import * as admin from "firebase-admin";  

    admin.initializeApp()

    const db = admin.firestore()


    exports.createUser = functions.auth.user().onCreate(async user => {

      const batch = db.batch()

      const res = await  db.collection("users").get()

      if(res.size === 0) {
        batch.create(db.collection("users").doc("amy"),{
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        })
        .create(db.collection("users").doc("max"),{
          image: {
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        })
        .create(db.collection("users").doc("juli"), {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        })
      }

 
      batch.create(db.collection("comments").doc(),{
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: admin.firestore.Timestamp.now(),
        score: 12,
        parentComment: null,
        hasReplies: false,
        userId:"345",
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
          userId:"123",
          commentThreadOwner:user.uid
      })

      batch.create(db.collection("comments").doc(),{
          content:
            "lorem ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: commentWithReplies.id,
          hasReplies: false,
          userId:"234",
          commentThreadOwner:user.uid
      })

      batch.create(db.collection("comments").doc(),{
          content:
            "lorem ipsum",
          createdAt: admin.firestore.Timestamp.now(),
          score: 12,
          parentComment: commentWithReplies.id,
          hasReplies: false,
          userId:"234",
          commentThreadOwner:user.uid
      })

    await batch.commit()

    })
