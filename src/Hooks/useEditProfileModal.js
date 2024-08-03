import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {firestore, storage} from '../Firebase/Firebase'
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import { loginUser } from "../Store/Actions"
export const useEditProfileModal=()=>{

    const dispatch= useDispatch()
    const [isUpdating,setIsUpdating]=useState(false)
    const authUser=useSelector(state=>state.User)


    const editProfile=async(inputs,selectedFile)=>{
        if(isUpdating || ! authUser) return;
        setIsUpdating(true);

        const strorageRef=ref(storage,`profilePics/${authUser.uid}`);
        const userDocRef=doc(firestore,'users',authUser.uid);

        let URL="";

        try {
            if(selectedFile);
            {
                await uploadString(strorageRef,selectedFile,'data_url');
                URL =await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`));

            }

            const updatedUser={
                ...authUser,
                fullName:inputs.fullName || authUser.fullName,
                userName:inputs.userName || authUser.userName,
                bio:inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            await updateDoc(userDocRef,updatedUser);
            localStorage.setItem('user-info',JSON.stringify(updatedUser));
            dispatch(loginUser(updatedUser))
            
        } catch (error) {
            console.log(error.message)
            
        }finally{
            setIsUpdating(false)
        }

    }




    return {editProfile,isUpdating}
}