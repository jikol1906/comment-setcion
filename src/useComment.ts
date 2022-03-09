import { useEffect, useState } from "react";
import { Comment, ReplyInfo } from "./interfaces";
import * as FirestoreService from "./Firebase";
import { User } from "firebase/auth";

export default function useComments() {
  const [comments, setComments] = useState<Comment[]>();


//   useEffect(() => {
//     const tempComments: Comment[] = [];

    
//         FirestoreService.subscribeRootComments(user.uid, (c) => {
//           if (!c.empty) {
//             c.forEach((doc) => {
//               const comm = doc.data() as Comment;
//               comm.id = doc.id;
//               tempComments.push(comm);
//             });
    
//             setComments(tempComments);
//           }
//         });
//     }
//   }, [user]);

  const addComment = (content: string, replyInfo?: ReplyInfo) => {};

  

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
  };
}
