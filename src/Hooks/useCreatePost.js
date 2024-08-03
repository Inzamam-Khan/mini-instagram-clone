import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { addPost, addPostToAuthUser } from "../Store/Actions";
import {firestore,storage} from '../Firebase/Firebase'
import { addDoc,doc,updateDoc,collection,arrayUnion } from "firebase/firestore";
import { getDownloadURL,ref,uploadString } from "firebase/storage";
export function useCreatePost(){

    const dispatch=useDispatch()

    const [isLoading,setIsLoading]=useState(false)
    const authUser=useSelector(state=>state.User);
    const posts=useSelector(state=>state.userPost)
    
    const {pathname}=useLocation()
          
        // 
    const createPost=async(selectedFile,caption)=>{
        if(!selectedFile) {
            alert('No File Selected...');
            throw new Error('No file Selected')
        };
        
        setIsLoading(true)

        const newPost={
            caption:caption,
            likes:[],
            comments:[],
            createdAt:Date.now(),
            createdBy:authUser.uid,
        }

        try {

            const postDocRef =await addDoc(collection(firestore,'posts'),newPost);
           

            const userDocRef= doc(firestore,'users',authUser.uid);
           
            const imageRef=ref(storage,`posts/${postDocRef.id}`);
          
            
            await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)});

            await uploadString(imageRef,selectedFile,'data_url');

            const downloadURL= await getDownloadURL(imageRef)
          
            await updateDoc(postDocRef,{imageURL:downloadURL});

            newPost.imageURL=downloadURL;


            dispatch(addPost(postDocRef.id))
            // alert('Post created Successfully')
            dispatch(addPostToAuthUser(postDocRef.id))


            

            
        } catch (error) {
            console.log(error)
            
        }finally{
            setIsLoading(false)
        }
        
    }


    return {createPost,isLoading,}
}