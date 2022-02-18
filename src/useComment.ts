import { useLocalStorage } from 'usehooks-ts'
import data from './data.json'
import { Comment } from './interfaces'

export default function useComments() {

    const [comments,setComments] = useLocalStorage<Comment[]>('comments',data.comments)


    return comments

}