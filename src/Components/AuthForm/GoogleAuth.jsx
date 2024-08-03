import { Flex,Text,Image } from "@chakra-ui/react"
import googleLogo from '../../assets/Google__G__logo.svg'
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth, firestore } from "../../Firebase/Firebase"
import { useDispatch } from "react-redux"
import { loginUser } from "../../Store/Actions"
import { setDoc,doc ,getDoc} from 'firebase/firestore';
export const GoogleAuth=({prefix})=>{
    
    const dispatch=useDispatch()

        const [signInWithGoogle,user,loading,error]=useSignInWithGoogle(auth)


    const handleGoogleAuth=async()=>{
        try{
            const newUser=await signInWithGoogle()

            if(!newUser && error) throw new Error("Failed!!!");

            const userRef=doc(firestore,'users',newUser.user.uid);
            const userSnap=await getDoc(userRef)


                    // signup section
            if(!userSnap.exists()){
                const userDoc={
                    uid:newUser.user.uid,
                    email:newUser.user.email,
                    userName:newUser.user.email.split("@")[0],
                    fullName:newUser.user.displayName,
                    bio:'',
                    profilePicURL:newUser.user.photoURL,
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now(),
                };
                await setDoc(doc(firestore,'users',newUser.user.uid),userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc));
                dispatch(loginUser(userDoc))
            }

            else{
                const userDoc=userSnap.data();
                localStorage.setItem('user-info',JSON.stringify(userDoc));
                dispatch(loginUser(userDoc))
            }
           
        }
        catch(error){
            console.log(error.message)

        }

    }

    
    return (
        <>
        
        <Flex gap={2} onClick={handleGoogleAuth} align={"center"} justifyContent={"center"} cursor={"pointer"}>
                    <Image src={googleLogo} w={5} alt={"Google Logo"}/>
                    <Text mx="2" color={"blue.500"}>Login with Google</Text>
                </Flex>
        
        </>
    )
}