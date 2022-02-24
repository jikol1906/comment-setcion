export interface CommentBase {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}
export interface Comment extends CommentBase {
  replies: Reply[];
}

export interface Reply extends CommentBase {
  replyingTo: string;
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
  topLevelCommentId:number;
}

export interface CommentProps {
  content: string;
  score: number;
  user:User
}
