import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../Store/Actions";
import { firestore } from "../Firebase/Firebase";

export const useGetUserPosts=()=>{

    const dispatch=useDispatch();
    const [isLoading,setIsLoading]=useState(true);
    const visitingProfileUser=useSelector(state=>state.visitingProfileUser)
    const postsState=useSelector(state=>state.userPost)
    

    
    

        const getUserPosts=async()=>{
            
            setIsLoading(true);
            try {
                const q=query(collection(firestore,'posts'),where('createdBy','==',visitingProfileUser?.uid));
                const querySnapshot= await getDocs(q)
                
                
                 
                let posts=[];
                querySnapshot.forEach((doc)=>{
                    posts.push({...doc.data(),id:doc.id})
                })
                
                
                posts.sort((a,b)=>b.createdAt-a.createdAt);
                // action dispatch 
                dispatch(setPost(posts))
                
                
            } catch (error) {
                console.log(error.message)
                
            }finally{
                setIsLoading(false)
            }
        }


    return {isLoading,getUserPosts,postsState}
}