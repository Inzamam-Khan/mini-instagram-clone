import { Avatar, Flex ,Text,Box, Button} from "@chakra-ui/react"
import userLogo from '../../assets/userLogo.png'
import { useGetUserProfileById } from "../../Hooks/useGetUserProfileById"
import { timeAgo } from "../../utils/timeAgo"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useFollowUser } from "../../Hooks/useFollowUser"
export const PostHeader=({post,userProfile})=>{

    const {handleFollowUser,isFollowing,isUpdating}=useFollowUser(post?.createdBy)

    

    return(
       <Flex justify={"space-between"} align={"center"} w={"full"} mt={8}>


        {/* left side  */}
        <Flex align={"center"} gap={2}>
            <Link to={`/${userProfile?.userName}`}>
            <Avatar w={7}  border={"1px solid white"} src={userProfile?.profilePicURL} />
            </Link>

       

            <Flex fontSize={12}  fontWeight={"bold"} gap={2}>
                <Link to={`/${userProfile?.userName}`}>
                {userProfile?.fullName}
                </Link>
                

                <Box color={"gray.500"}> 
                    {timeAgo(post.createdAt)}

                </Box>

            </Flex>
        </Flex>



        {/* right side follow button */}
        <Box cursor={"pointer"} >
            <Button fontSize={12} color={"purple.400"} onClick={handleFollowUser} isLoading={isUpdating}
             fontWeight={"bold"} _hover={{color:'white'}} transition={'0.2s ease-in-out'}>
                {isFollowing? "UnFollow" : "Follow"}
                 
            </Button>
        </Box>
       </Flex>
    )
}