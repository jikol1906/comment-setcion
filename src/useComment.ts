import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import data from './data.json'
import { Comment, ReplyInfo, User } from './interfaces'
import * as FirestoreService from './Firebase';

export default function useComments(userId:string|undefined)  {

    
    const [comments,setComments] = useState<Comment[]>();
    
    useEffect(() => {

        const tempComments : Comment[] = []

        if(userId) {
            FirestoreService.subscribeRootComments(userId,(c) => {
                c.forEach(doc => {
                    const comm = doc.data() as Comment
                    comm.id = doc.id
                    tempComments.push(comm)
                })
                
                setComments(tempComments)
            })
        }

        
        

    },[userId])


    const addComment = (content:string,replyInfo?:ReplyInfo) => { 
        
      
        
    }  

    const reply = () => {

    }
    

    const deleteComment = (commentId:string) => {
        

    }

    const postReply = () => {
        
    }

    const replyingTo = () => {

    }

    const setReplyingTo = () => {

    }

    return {comments,replyingTo,setReplyingTo,reply,addComment,deleteComment}

}