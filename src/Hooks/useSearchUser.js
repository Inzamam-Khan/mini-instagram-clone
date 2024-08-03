import { collection, getDocs, query, where } from "firebase/firestore"
import { useState } from "react"
import { firestore } from "../Firebase/Firebase"

export const useSearchUser=()=>{


    const [isLoading,setIsLoading]=useState(false)
    const [searchUser,setSearchUser]=useState(null)

    const getUserProfile=async(username)=>{
        
        if(!username || isLoading) return;
            setIsLoading(true)
        try {
            const q=query(collection(firestore,'users'),where('userName','==',username))
            const querySnapshot=await getDocs(q)

            if(querySnapshot.empty) throw new Error('User Not found...')

                querySnapshot.forEach(doc=>setSearchUser(doc.data()))
                
            
        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }

    }


    return {isLoading,getUserProfile,searchUser,setSearchUser}
}