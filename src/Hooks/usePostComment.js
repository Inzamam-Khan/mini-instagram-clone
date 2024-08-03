import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../Firebase/Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { addCommentToPost } from "../Store/Actions";

export function usePostComment(){

    const dispatch=useDispatch()

    const authUser=useSelector(state=>state.User)

    const posts=useSelector(state=>state.userPost);
    const [isLoading,setIsLoading]=useState(false)


const postComment=async(comment,postId)=>{
    
    if(isLoading || !authUser) return new Error("Invalid Operation!!!")

        setIsLoading(true)
        try {
            const newComment={
                comment,
                postId,
                createdBy:authUser.uid,
                createdAt:Date.now()

            }

            await updateDoc(doc(firestore,'posts',postId),{
                comments:arrayUnion(newComment)
            })


            dispatch(addCommentToPost({postId,newComment}))



            
        } catch (error) {
            console.log(error.message);
        }
        finally{
            setIsLoading(false)
        }



}

    return{postComment,isLoading}
}