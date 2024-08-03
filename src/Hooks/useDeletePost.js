import { deleteObject, ref } from "firebase/storage";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { firestore, storage } from "../Firebase/Firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { loginUser, removePost, updateUser } from "../Store/Actions";

export const useDeletePost=()=>{


        const [isLoading,setIsLoading]=useState(false);
        const authUser=useSelector(state=>state.User);
        const dispatch=useDispatch()
        


        const deletePost=async(post)=>{


            if(!window.confirm('Delete Confirm?')) return;
            if(isLoading) return;


            setIsLoading(true)
            try {
    
                const imageRef=ref(storage,`posts/${post.id}`);
                const userRef=doc(firestore,'users',authUser.uid);
    
                await deleteObject(imageRef);
                await deleteDoc(doc(firestore,'posts',post.id));

                await updateDoc(userRef,{
                    posts:arrayRemove(post.id)
                })

                dispatch(removePost(post.id))
                dispatch(updateUser(post.id))
                console.log(authUser)
                
                    
                



                
            } catch (error) {
                console.log(error.message)
                
            }finally{
                setIsLoading(false);
            }


        }
   









    return {deletePost,isLoading}
}