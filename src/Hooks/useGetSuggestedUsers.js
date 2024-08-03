import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import  { collection,getDocs,query,where,orderBy,limit } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
export function useGetSuggestedUsers(){
    

const [isLoading,setIsLoading]=useState(true);
const [suggestedUsers,setSuggestedUsers]=useState([])
const authUser=useSelector(state=>state.User)

const getSuggestedUsers=async()=>{
    setIsLoading(true)
    try {
        const userRef=collection(firestore,'users')
        const q=query(userRef,where("uid","not-in",[authUser.uid,...authUser.following]),orderBy('uid'),limit(3))

        const querySnapshot=await getDocs(q)
        
        const users=[];
        querySnapshot.forEach(doc=>users.push({...doc.data(),id:doc.id}))
        setSuggestedUsers(users)
        
    } catch (error) {
        console.log(error.message)
        
    }finally{
        setIsLoading(false)
    }
}

useEffect(()=>{
    if(authUser){
        
        getSuggestedUsers()
    }
    
},[authUser])




    return{suggestedUsers,isLoading}
}