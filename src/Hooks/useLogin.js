import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/Actions';
import {auth,firestore} from '../Firebase/Firebase'
import { setDoc,doc,getDoc } from 'firebase/firestore';
export const useLogin=()=>{

    const dispatch=useDispatch()
    const [
        signInWithEmailAndPassword,
        ,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);


      const login=async(inputs)=>{

        if(!inputs.email|| !inputs.password ) throw new Error('All Fields Required')

            try {
                const userCred=await signInWithEmailAndPassword(inputs.email,inputs.password)
                if(!userCred) throw new Error("Invalid credentials!!!")

                else
                    {
                    const docRef=doc(firestore,'users',userCred.user.uid)
                    const docSnap=await getDoc(docRef)
                    localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
                    dispatch(loginUser(docSnap.data()))
                }
                
                
            } catch (error) {
                alert(error.message)
                
            }
        



      }



    return {login,loading,error}
}