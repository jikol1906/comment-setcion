import { Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import data from './data.json'
import { Comment } from './interfaces'

export default function useComments() : [Comment[], Dispatch<SetStateAction<Comment[]>>] {

    const [comments,setComments] = useLocalStorage<Comment[]>('comments',data.comments)


    return [comments,setComments]

}