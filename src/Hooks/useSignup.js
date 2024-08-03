import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import {auth, firestore} from '../Firebase/Firebase'
import { setDoc,doc,getDoc } from 'firebase/firestore';
import userLogo from '../assets/userLogo.png'
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/Actions';
import { Alert, } from '@chakra-ui/react';
export const useSignup=()=>{
    const dispatch=useDispatch()

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      
      

const signup=async(inputs)=>{
    


if(!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName ) 
    {
         throw new Error('All Fields required')
        

    }
    try {

        const newUser=await createUserWithEmailAndPassword(inputs.email,inputs.password)
        if(!newUser || error) throw new Error(error)

        if(newUser)
            {
                const userDoc={
                    uid:newUser.user.uid,
                    email:inputs.email,
                    userName:inputs.userName,
                    fullName:inputs.fullName,
                    bio:'',
                    profilePicUrl:{userLogo},
                    following:[],
                    followers:[],
                    posts:[],
                    createdAt:Date.now()
                }

                

                await setDoc(doc(firestore,'users',newUser.user.uid),userDoc)
                const testUserRef= doc(firestore,'users',newUser.user.uid)
                const testUserSnap=await getDoc(testUserRef)
               
                localStorage.setItem('user-info',JSON.stringify(testUserSnap.data()));
                
                dispatch(loginUser(testUserSnap.data()))
                
            }

        
    } catch (error) {

       alert(error.message)
        
    }

}







    return {loading,error,signup}
}