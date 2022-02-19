import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import data from './data.json'
import { Comment, Reply, ReplyInfo, User } from './interfaces'

export default function useComments()  {

    const [comments,setComments] = useLocalStorage<Comment[]>('comments',data.comments)
    const [noOfComments,setNoOfComments] = useLocalStorage<number>('noOfComments',4)
    const [replyingTo,setReplyingTo] = useState<number>(0);



    const addComment = (content:string,replyInfo?:ReplyInfo) => { 
        
        const user : User = {
            image:{
                webp:data.currentUser.image.webp,
                png:data.currentUser.image.png,
            },
            username:data.currentUser.username
        }
        
        if(replyInfo) {
            const {replyingToUsername,topLevelCommentId} = replyInfo

            const newReply : Reply = {
                replyingTo:replyingToUsername,
                content,
                createdAt:"Now",
                id: noOfComments + 1,
                score:0,
                user

            }

                const topLevelComment = comments.find(c => c.id === topLevelCommentId)
                const oldCommentRemoved = comments.filter(c => c.id !== topLevelCommentId)
                topLevelComment?.replies.push(newReply)
                
                setComments([...oldCommentRemoved,topLevelComment!])

            setReplyingTo(0)

            
        } else {
            const newComment : Comment = {
                id:noOfComments + 1,
                content,
                replies:[],
                score:0,
                createdAt:'Now',
                user
                
            }
    
            setComments([...comments,newComment])
        }
        setNoOfComments(noOfComments+1)
        
    }

    const reply = (commentId:number,replyInfo:ReplyInfo) => 
        (content:string) => 
            addComment(content,replyInfo)
    

    const deleteComment = (commentId:number) => {
        let updatedComments : Comment[] = [];

        comments.forEach(c => {
            if(c.id !== commentId) {
                const updatedReplies : Reply[] = []
                if(c.replies.length > 0) {
                    c.replies.forEach(r => {
                        if(r.id !== commentId) {
                            updatedReplies.push(r)
                        }
                    })
                    c.replies = updatedReplies
                }
                updatedComments.push(c)
            }
        })

        setComments(updatedComments)
        setNoOfComments(prev => prev - 1)

    }

    const postReply = () => {
        
    }

    return {comments,replyingTo,setReplyingTo,reply,addComment,deleteComment}

}