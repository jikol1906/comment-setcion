import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import data from './data.json'
import { Comment, ReplyInfo, User } from './interfaces'
import * as FirestoreService from './Firebase';

export default function useComments(userId:string|undefined)  {

    
    const [comments,setComments] = useState();
    
    useEffect(() => {
        if(userId) {
            FirestoreService.subscribeRootComments(userId,(c) => {
                console.log('here');
                c.forEach(doc => {
                    console.log(doc.id," => ", doc.data());
                    
                })
                
                
            })
        }
    },[userId])


    const addComment = (content:string,replyInfo?:ReplyInfo) => { 
        
      
        
    }

    const reply = () => {

    }
    

    const deleteComment = (commentId:number) => {
        

    }

    const postReply = () => {
        
    }

    const replyingTo = () => {

    }

    const setReplyingTo = () => {

    }

    return {comments,replyingTo,setReplyingTo,reply,addComment,deleteComment}

}