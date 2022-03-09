import { FieldValue } from "firebase/firestore";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user:User,
  hasReplies:boolean;
  commentThreadOwner:string;
  parentComment:string|null
}



export interface User {
  image: Image;
  username: string;
}

export interface Image {
  png: string;
  webp: string;
}

export interface ReplyInfo {
  replyingToUsername:string
  topLevelCommentId:string;
}

export interface CommentProps {
  content: string;
  createdAt:string;
  score: number;
}
