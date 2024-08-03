import { useEffect, useState } from "react"
import { setVisitingProfileUser } from "../Store/Actions";
import { useDispatch } from "react-redux";
import {firestore} from '../Firebase/Firebase'
import { query} from "firebase/database";

import { collection,getDocs,where } from "firebase/firestore";
import { getDoc,setDoc } from "firebase/firestore";


export const useGetuserProfileByUsername=()=>{
    const [isLoading ,setIsLoading]=useState(false)
    const dispatch=useDispatch()
    const [searchUser,setSearchUser]=useState(null)

    
    // a function to get user by userName;

    const getUserProfile=async(userName)=>{
        
        
        if(!userName || isLoading) return;
        
        
        setIsLoading(true);
        try {
            const q=query(collection(firestore,'users'),where('userName', '==' , userName));
            const querySnapshot=await getDocs(q);
            

            if(querySnapshot.empty) return dispatch(setVisitingProfileUser(null))

            querySnapshot.forEach(doc=>{
                

                setSearchUser(doc.data())
                // let userDoc=doc.data()
                // setSe
                dispatch(setVisitingProfileUser(doc.data()))

            });
            
            
        } catch (error) {
            console.log(error.message)
            
        }finally{
            setIsLoading(false)
        }
    }

 


    return{ getUserProfile,isLoading,searchUser,setSearchUser}
}