import { useState } from "react"
import { firestore } from "../Firebase/Firebase";
import { getDoc ,doc, getDocFromCache} from "firebase/firestore";

export function useGetUserProfileById(){
    
    
    const [isLoading,setIsLoading]=useState(true);
    const [userProfile,setUserProfile]=useState(null);

    const getUserProfileById=async(userId)=>{
        setIsLoading(true);
        setUserProfile(null);
        try {
            
            const userRef=await getDoc(doc(firestore,"users",userId))

            if(userRef.exists()){
                setUserProfile(userRef.data())
            }
        } catch (error) {
            console.log(error.message)
        }finally{
            setIsLoading(false);
        }
    }
    
    
    
    
    return {getUserProfileById,userProfile,isLoading}
}