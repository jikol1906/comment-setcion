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
import { User } from "../../interfaces";
import AddComment from "../AddComment/AddComment";

const auth = getAuth(FirestoreService.firebaseApp);

interface IReplyListProps {
  parentCommentId: string;

  replyingTo:string;
  onDeleteButtonClicked: (commentId:string) => void;
  onReplyButtonClicked: (commentId:string) => void;
  setReplyingTo: React.Dispatch<React.SetStateAction<string>>;
  onUpdateSubmitted:(commentId: string) => (updatedContent: string) => Promise<void>;
}

const ReplyList: React.FunctionComponent<IReplyListProps> = ({
  parentCommentId,
  replyingTo,
  onDeleteButtonClicked,
  onReplyButtonClicked,
  onUpdateSubmitted,
  setReplyingTo

}) => {
  const [user] = useAuthState(auth);
  
    
  const coll = collection(db, "comments");

  const [value, loading, error] = useCollection(
    query(coll, where("parentComment", "==", parentCommentId), where("commentThreadOwner", "==", user?.uid))
  );

  const comments : JSX.Element[] = [];
    console.log(user?.uid);
    
  if(value) {
    value.forEach(v => {
      const c = v.data() as IComment;
      const replyingToComponent = replyingTo === v.id ? <AddComment replyingTo={v.id} setReplyingTo={setReplyingTo}/> : null
        comments.push(
          user?.uid === "juli" ?
          <CurrentUserComment key={v.id} {...c} userInfo={c.user} onUpdateSubmitted={onUpdateSubmitted(v.id)} onDeleteButtonClicked={() => onDeleteButtonClicked(v.id)}/>
          :
          <>
            <Comment userInfo={c.user} key={v.id} {...c} onReplyButtonClicked={() => onReplyButtonClicked(v.id)}/>
            {replyingToComponent}
          </>
        )
      
    })
  }

  return (
    <CommentReplyThread>
      {loading ? <Loadingspinner/> : comments}
    </CommentReplyThread>
  );
};

export default ReplyList;
