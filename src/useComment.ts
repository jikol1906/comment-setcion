import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import data from './data.json'
import { Comment } from './interfaces'

export default function useComments()  {

    const [comments,setComments] = useLocalStorage<Comment[]>('comments',data.comments)
    const [noOfComments,setNoOfComments] = useLocalStorage<number>('noOfComments',4)
    const [replyingTo,setReplyingTo] = useState<number>(3);

    const addComment = (content:string) => { 
        
        console.log('content',content);
        
        const newComment : Comment = {
            id:noOfComments + 1,
            content,
            replies:[],
            score:0,
            createdAt:'Now',
            user: {
                image:{
                    webp:data.currentUser.image.webp,
                    png:data.currentUser.image.png,
                },
                username:data.currentUser.username
            }
        }

        setComments([...comments,newComment])
        setNoOfComments(noOfComments+1)
    }

    return {comments,replyingTo,setReplyingTo,addComment}

}