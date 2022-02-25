import { useEffect, useState } from "react";
import { Comment, ReplyInfo } from "./interfaces";
import * as FirestoreService from "./Firebase";
import { User } from "firebase/auth";

export default function useComments() {
  const [comments, setComments] = useState<Comment[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function authenticateAndSeedDb() {
      const user = await FirestoreService.authenticateAnonymously()
      setUser(user.user);
      FirestoreService.seedDatabase(user.user.uid);
    }
    authenticateAndSeedDb()
  }, []);

  useEffect(() => {
    const tempComments: Comment[] = [];

    if(user) {
        FirestoreService.subscribeRootComments(user.uid, (c) => {
          if (!c.empty) {
            c.forEach((doc) => {
              const comm = doc.data() as Comment;
              comm.id = doc.id;
              tempComments.push(comm);
            });
    
            setComments(tempComments);
          }
        });
    }
  }, [user]);

  const addComment = (content: string, replyInfo?: ReplyInfo) => {};

  const getReplies = (parentCommentId: string) => {
    if(user) {
        return FirestoreService.getReplies(user.uid, parentCommentId);
    }
  };

  const reply = () => {};

  const deleteComment = (commentId: string) => {};

  const postReply = () => {};

  const replyingTo = () => {};

  const setReplyingTo = () => {};

  return {
    comments,
    replyingTo,
    setReplyingTo,
    reply,
    addComment,
    deleteComment,
    getReplies,
  };
}
