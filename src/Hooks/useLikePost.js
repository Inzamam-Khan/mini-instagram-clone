import { useState } from "react"
import { useSelector } from "react-redux";
import { firestore } from "../Firebase/Firebase";
import { arrayUnion, doc, updateDoc,arrayRemove } from "firebase/firestore";

export const useLikePost=(post)=>{
    
    
   
    const [isUpdating,setIsUpdating]=useState(false)
    const [likes,setLikes]=useState(post?.likes?.length)
    const authUser=useSelector(state=>state.User);
    const[isLiked,setIsLiked]=useState(post?.likes?.includes(authUser?.uid));

    const likePost=async()=>{

        if(!authUser || isUpdating) return;
        setIsUpdating(true)
        try {
            const postRef=doc(firestore,'posts',post?.id)
            await updateDoc(postRef,{
                likes:isLiked? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            setIsLiked(!isLiked);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
            

        } catch (error) {
            console.log(error)
            
        }finally{
            setIsUpdating(false)
        }
        
        
    }


    
    return{likePost,likes,isLiked}
}