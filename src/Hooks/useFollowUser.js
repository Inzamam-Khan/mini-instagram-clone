import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {firestore} from '../Firebase/Firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { loginUser, setVisitingProfileUser } from "../Store/Actions";

export const useFollowUser=(userId)=>{
    
    
    
    const [isUpdating,setIsUpdating]=useState(false);
    const [isFollowing,setIsFollowing]=useState(false)
    const dispatch=useDispatch()

    const authUser=useSelector(state=>state.User);
    const visitingProfileUser=useSelector(state=>state.visitingProfileUser)


    

    
    useEffect(()=>{
        if(authUser)
            {
            
        
            const Following=authUser.following.includes(userId)
            setIsFollowing(Following)
            
        }
    },[userId,isUpdating,isFollowing])
    

    

    const handleFollowUser=async()=>{

        if(!authUser && !isUpdating) return;
        
        setIsUpdating(true)


        try {

            const currentUserDoc=doc(firestore,'users',authUser.uid);
            const userToFollowDoc=doc(firestore,'users',userId)


            await updateDoc(currentUserDoc,{
                following:isFollowing? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(userToFollowDoc,{
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })



            if(isFollowing)
                {
                // unfollow case:
                
                dispatch(loginUser({...authUser,following:authUser.following.filter(uid=> userId !== uid)}))

                if(visitingProfileUser)
                {
                    dispatch(setVisitingProfileUser({...visitingProfileUser,followers:visitingProfileUser?.followers?.filter(uid=> userId !== uid)}))
                }
               
                localStorage.setItem('user-info',JSON.stringify({
                    ...authUser,following:authUser.following.filter((uid=> uid !== userId))
                }))
                setIsFollowing(false)


                
            }
            else{
                // follow case:
            
                dispatch(loginUser({...authUser,following:[...authUser.following,userId]}))

                if(visitingProfileUser)
                {
                    dispatch(setVisitingProfileUser({...visitingProfileUser,followers:[...visitingProfileUser?.followers,authUser.uid]}))
                }
                
                localStorage.setItem('user-info',JSON.stringify({...authUser,following:[...authUser.following,userId]}))
                    setIsFollowing(true)
                   
            }
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setIsUpdating(false)
        }

    }






    return {isUpdating,isFollowing,handleFollowUser}


}