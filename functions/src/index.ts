import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate((user) => {
  const batch = db.batch();

  const oneMonthAgo = new Date().setTime(
      new Date().getTime() - 30 * 1000 * 60 * 60 * 24
  );
  const twoWeekAgo = new Date().setTime(
      new Date().getTime() - 14 * 1000 * 60 * 60 * 24
  );

  batch.create(db.collection("comments").doc(), {
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: admin.firestore.Timestamp.fromMillis(oneMonthAgo),
    score: 12,
    parentComment: null,
    hasReplies: false,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    commentThreadOwner: user.uid,
  });

  const commentWithReplies = db.collection("comments").doc();

  batch.create(commentWithReplies, {
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: admin.firestore.Timestamp.fromMillis(twoWeekAgo),
    score: 5,
    parentComment: null,
    hasReplies: true,
    user: {
      image: {
        png: "./images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
      username: "maxblagun",
    },
    commentThreadOwner: user.uid,
  });

  batch.create(db.collection("comments").doc(), {
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: admin.firestore.Timestamp.now(),
    score: 4,
    parentComment: commentWithReplies.id,
    hasReplies: false,
    user: {
      image: {
        png: "./images/avatars/image-ramsesmiron.png",
        webp: "./images/avatars/image-ramsesmiron.webp",
      },
      username: "ramsesmiron",
    },
    commentThreadOwner: user.uid,
  });

  batch.create(db.collection("comments").doc(), {
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    createdAt: admin.firestore.Timestamp.now(),
    score: 12,
    parentComment: commentWithReplies.id,
    hasReplies: false,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    commentThreadOwner: user.uid,
  });

  return batch.commit();
});

exports.addComment = functions.https.onCall(async (data, { auth }) => {
  if (auth) {
    const { content, replyingTo } = data;
    try {
      const res = await admin
        .firestore()
        .collection("comments")
        .add({
          content,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          score: 0,
          parentComment: replyingTo,
          hasReplies: false,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          commentThreadOwner: auth.uid,
        });

      return res;
    } catch (err) {
      throw new functions.https.HttpsError("internal", "Something went wrong");
    }
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You must be authenticated"
    );
  }
});

exports.deleteComment = functions.https.onCall(async (data, { auth }) => {
  if (auth) {
    const { commentId } = data;

    const docRef = admin.firestore().collection("comments").doc(commentId);
    const doc = await docRef.get();
    const docData = doc.data();
    if (docData) {
      if (docData.commentThreadOwner !== auth.uid) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Comment does not belong to you"
        );
      } else {
        return await docRef.delete();
      }
    } else {
      throw new functions.https.HttpsError(
        "not-found",
        "Comment doesn't exist"
      );
    }
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You must be authenticated"
    );
  }
});

exports.updateComment = functions.https.onCall(async (data, { auth }) => {
  if (auth) {
    const { commentId, content } = data;

    const docRef = admin.firestore().collection("comments").doc(commentId);
    const doc = await docRef.get();
    const docData = doc.data();
    if (docData) {
      if (docData.commentThreadOwner !== auth.uid) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Comment does not belong to you"
        );
      } else {
        return await docRef.update({
          content,
        });
      }
    } else {
      throw new functions.https.HttpsError(
        "not-found",
        "Comment doesn't exist"
      );
    }
  } else {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You must be authenticated"
    );
  }
});
