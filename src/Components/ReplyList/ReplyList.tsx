import { getAuth } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../Firebase";
import CommentReplyThread from "../../Layout/CommentReplyThread/CommentReplyThread";
import * as FirestoreService from "../../Firebase";
import { Comment as IComment } from "../../interfaces";
import CurrentUserComment from "../Comment/CurrentUserComment";
import Comment from "../Comment/Comment";
import Loadingspinner from "../Loadingspinner/Loadingspinner";

const auth = getAuth(FirestoreService.firebaseApp);

interface IReplyListProps {
  parentCommentId: string;
  replyingTo:string;
  onDeleteButtonClicked: (commentId:string) => void;
  onReplyButtonClicked: (commentId:string) => void;
  onUpdateSubmitted:(commentId: string) => (updatedContent: string) => Promise<void>;
}

const ReplyList: React.FunctionComponent<IReplyListProps> = ({
  parentCommentId,
  replyingTo,
  onDeleteButtonClicked,
  onReplyButtonClicked,
  onUpdateSubmitted
}) => {
  const [user] = useAuthState(auth);
    
  const coll = collection(db, user!.uid);

  const [value, loading, error] = useCollection(
    query(coll, where("parentComment", "==", parentCommentId))
  );

  const comments : JSX.Element[] = [];

  // if(value) {
  //   value.forEach(v => {
  //     const c = v.data() as IComment;
  //       comments.push(
  //         user?.uid === c.user.userId ?
  //         <CurrentUserComment key={v.id} {...c} onUpdateSubmitted={onUpdateSubmitted(v.id)} onDeleteButtonClicked={() => onDeleteButtonClicked(v.id)}/>
  //         :
  //         <Comment key={v.id} {...c} onReplyButtonClicked={() => onReplyButtonClicked(v.id)}/>
  //       )
      
  //   })
  // }

  return (
    <CommentReplyThread>
      {loading ? <Loadingspinner/> : comments}
    </CommentReplyThread>
  );
};

export default ReplyList;
