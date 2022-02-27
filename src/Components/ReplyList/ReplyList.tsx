import { getAuth } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../Firebase";
import CommentReplyThread from "../../Layout/CommentReplyThread/CommentReplyThread";
import * as FirestoreService from "../../Firebase";
import { Comment as IComment } from "../../interfaces";
import CurrentUserComment from "../Comment/CurrentUserComment";
import Comment from "../Comment/Comment";

const auth = getAuth(FirestoreService.firebaseApp);

interface IReplyListProps {
  parentCommentId: string;
  onDeleteButtonClicked: () => void;
  onReplyButtonClicked: () => void;
}

const ReplyList: React.FunctionComponent<IReplyListProps> = ({
  parentCommentId,
  onDeleteButtonClicked,
  onReplyButtonClicked,
}) => {
  const [user] = useAuthState(auth);
    
  const coll = collection(db, user!.uid);

  const [value, loading, error] = useCollectionData(
    query(coll, where("parentComment", "==", parentCommentId))
  );

  return (
    <CommentReplyThread>
      {value &&
        value.map((v) => {
          const c = v as IComment;
          return user?.uid === c.user.userId ? (
            <CurrentUserComment
              {...c}
              onDeleteButtonClicked={onDeleteButtonClicked}
            />
          ) : (
            <Comment {...c} onReplyButtonClicked={onReplyButtonClicked} />
          );
        })}
    </CommentReplyThread>
  );
};

export default ReplyList;
