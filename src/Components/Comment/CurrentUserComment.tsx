import { useState } from "react";
import { CommentProps, User } from "../../interfaces";
import IconButton from "../Button/IconButton";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import TextArea from "../TextArea/TextArea";
import UserInfo from "../UserInfo";
import CommentSkeleton from "./CommentSkeleton";
import CommentText from "./CommentText";

interface ICurrentUserComment extends CommentProps {
  onDeleteButtonClicked: () => void;
  userInfo:User;
  onUpdateSubmitted:(updatedContent: string) => Promise<void>;
}

const CurrentUserComment: React.FunctionComponent<ICurrentUserComment> = ({
  onDeleteButtonClicked,
  onUpdateSubmitted,
  content,
  userInfo,
  score,
  createdAt
}) => {

  const [editing,setEditing] = useState(false)
  const [commentContent,setCommentContent] = useState(content)
  
  
  return (
    <CommentSkeleton>
      <div className="col-span-full md:col-start-2 md:col-end-3">
        <UserInfo user={userInfo} currentUser createdAt={createdAt} />
      </div>
      <div className="col-span-full md:col-start-2 md:col-end-4">
        {editing ? (
          <>
            <form id="updateform" onSubmit={e => {
              e.preventDefault()
              onUpdateSubmitted(commentContent)
              setEditing(false)
            }}>
              <TextArea rows={4} value={commentContent} onChange={e=>setCommentContent(e.target.value)}></TextArea>
            </form>
          </>
        ) : (
          <CommentText text={commentContent} />
        )}
      </div>
      <div className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3">
        <LikeDislikeButton score={score} />
      </div>
      {!editing && (
        <div className="flex col-start-3 space-x-2 md:row-start-1 md:row-end-2">
          <IconButton
            variant="danger"
            onClick={onDeleteButtonClicked}
            icon={
              <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.167 12.448C2.167 13.302 2.867 14 3.722 14H9.944C10.8 14 11.5 13.302 11.5 12.448V3.5H2.167V12.448ZM12.667 1.167H9.75L8.773 0H4.893L3.917 1.167H1V2.333H12.667V1.167V1.167Z" />
              </svg>
            }
          >
            Delete
          </IconButton>
          <IconButton
            variant="normal"
            onClick={_ => setEditing(true)}
            icon={
              <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.479 2.87195L11.08 0.473947C10.767 0.180345 10.357 0.0120105 9.92792 0.000948149C9.49889 -0.0101142 9.08075 0.136867 8.753 0.413947L0.879 8.28695C0.595453 8.57231 0.418879 8.94665 0.379 9.34695L0.00399967 12.9949C-0.00700433 13.1163 0.00746647 13.2386 0.0464849 13.3541C0.0855033 13.4696 0.148209 13.5756 0.230584 13.6654C0.312959 13.7552 0.413187 13.8268 0.524846 13.8757C0.636505 13.9245 0.757132 13.9494 0.879 13.9489H0.957L4.607 13.6159C5.006 13.5759 5.38 13.3999 5.665 13.1169L13.54 5.24195C13.8456 4.91909 14.0108 4.48826 13.9994 4.04384C13.9879 3.59943 13.8008 3.17766 13.479 2.87095V2.87195ZM10.504 5.79495L8.159 3.44895L9.865 1.69995L12.254 4.08995L10.504 5.79595V5.79495Z" />
              </svg>
            }
          >
            Edit
          </IconButton>
        </div>
      )}
      {editing && (
        <button type="submit" form="updateform" className="btn col-start-3">
          Update
        </button>
      )}
    </CommentSkeleton>
  );
};

export default CurrentUserComment;
