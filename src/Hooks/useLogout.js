import {useDeleteUser, useSignOut} from 'react-firebase-hooks/auth'
import {auth} from '../Firebase/Firebase'
import { useShowToast } from './useShowToast'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../Store/Actions'
export const useLogout=()=>{

    const dispatch=useDispatch()
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast=useShowToast()

    const handleLogout=async()=>{
        try {
            
           const res= await signOut();
           console.log(res)
            localStorage.removeItem('user-info')
            dispatch(logoutUser())
        } catch (error) {
            showToast("Error",error.message,"error")
            
        }
    }
    
    return {handleLogout,isLoggingOut,error}
}