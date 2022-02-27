import * as React from "react";
import * as FirestoreService from '../Firebase';
import { collection, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../Firebase";
const auth = getAuth(FirestoreService.firebaseApp);



const CommentList: React.FunctionComponent = () => {

  const [user] = useAuthState(auth);

  const coll = collection(db,user!.uid)
  
  const [value, loading, error] = useCollectionData(query(coll,where("parentComment","==",null)))
  
   
   
    
  

  // let commentsRendered: JSX.Element[] = []; 
    
  //   const createComment = (c: IComment) => {
  //     const comment =
  //       c.user.username === currentUser.username ? (
  //         <CurrentUserComment
  //           {...c}
  //           onDeleteButtonClicked={() => deleteComment(c.id)}
  //         />
  //       ) : (
  //         <Comment onReplyButtonClicked={() => setReplyingTo(c.id)} {...c} />
  //       );

  //       if(c.hasReplies) {
  //         console.log('here');
          
  //          getReplies(c.id)?.then(r => {
  //            r.forEach(r => console.log(r.data()))
  //          })
            
          
          
           
  //       }
  
  //     return comment

  //   };
  
  //   comments?.forEach((c) => {
      
      
      
      
  //     commentsRendered.push(
  //       <React.Fragment key={c.id}>{createComment(c)}</React.Fragment>
  //     );
  //   })
  
  
  

  
  //   if (c.replies.length > 0) {
  //     commentsRendered.push(
  //       <CommentReplyThread key={`r${c.id}`}>
  //         {c.replies.map((r) => {
  //           return (
  //             <React.Fragment key={r.id}>
  //                 {createComment(r)}
  //             </React.Fragment>
  //           );
  //         })}
  //       </CommentReplyThread>
  //     );
  //   }
  // });

 
  return <>
    {value && value.map(v => {
      
    })}
  </>  
  // return <>{commentsRendered}</>  

}


export default CommentList;
