import { Flex ,Link,Text,Container, SkeletonCircle, VStack, Skeleton} from "@chakra-ui/react"
import { useParams,Link as RouterLink } from "react-router-dom"
import { ProfileHeader } from "../../Components/Profile/ProfileHeader"
import { ProfileTabs } from "../../Components/Profile/ProfileTabs"
import { ProfilePosts } from "../../Components/Profile/ProfilePosts"
import { useSelector } from "react-redux"
import { useGetuserProfileByUsername } from "../../Hooks/useGetuserProfileByUsername"
import { useEffect } from "react"

export const ProfilePage=()=>{
    
    const {userName}=useParams()

    const {getUserProfile,isLoading:loading,}=useGetuserProfileByUsername()
    
    

    const user=useSelector(state=>state.visitingProfileUser)
    
    
    
    const authUser=useSelector(state=>state.User)
    
    
    
   
            useEffect(()=>{
                getUserProfile(userName)
            },[userName,authUser])

            // if no such user found case:
                if( !user && !loading) return <UserNotFound/>
                

    return(
     <Container maxW={'container.xs'} mt={{base:8,sm:'0'}}  px={'1.2em'}>

{/* header content */}
            {
                !loading && user &&

                <>

                <Flex p={8} px={4} pl={{base:4,md:10}} w={"full"}  mx={"auto"} flexDirection={"column"} >
                
                    <ProfileHeader user={user}/>
                        
                
                
                </Flex>
                
                
                
                
                
                {/* user posts Content  */}
                <Flex px={{base:2,sm:4}} maxW={'full'} mx={"auto"} borderTop={"1px solid gray"} direction={"column"}>
                
                <ProfileTabs user={user}/>
                <ProfilePosts user={user}/>
                </Flex>
                
                
                
                
                
                
                    </>


            }

     </Container>
    )
}

export const UserNotFound=()=>{

return(
    <Flex flexDirection={'column'} textAlign={'center'} mx={'auto'} mt={'8em'}>

        <Text fontSize={'2xl'}>User Not Found</Text>
        <Link as={RouterLink} to={'/'} color={'blue.500'} w={'max-content'} mx={'auto'}>
        Go Home...
        </Link>




    </Flex>
)

}



