import { Flex, VStack,Avatar,Box,Button } from "@chakra-ui/react"
import { useFollowUser } from "../../Hooks/useFollowUser"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const SuggestedUser=({item,setSearchUser})=>{

    const {profilePicURL,fullName,followers}=item

    const {handleFollowUser,isFollowing,isUpdating,}=useFollowUser(item.uid)
    
    
    const authUser=useSelector(state=>state.User);
    
    

    const onFollowUser=async()=>{
        await handleFollowUser();
        setSearchUser({...item,followers:isFollowing ? item.followers.filter(uid => uid !== authUser.uid): [...item.followers,authUser.uid]})
    }
    
    
    return (
        <Flex justify={'space-between'} align={'center'} w={'full'} >

            <Flex align={'center'} gap={2}   >
                <Link to={`/${item.userName}`}>
                <Avatar src={profilePicURL} name={fullName} h={'2em'} w={'2em'} border={'1px solid white'}/>
                </Link>
                
                <VStack spacing={2} >
                    {/* name */}
                    <Link to={`/${item.userName}`}>
                    <Box fontSize={12} fontWeight={'bold'} textTransform={'capitalize'}>
                        {fullName}
                    </Box>
                    </Link>

                    {/* no of followers */}
                    <Box fontSize={11} color={'gray.500'}>{followers.length} Followers</Box>
                </VStack>

            </Flex>

                    {authUser.uid !==item.uid && 
                       <Button  onClick={onFollowUser} fontSize={14} color={'blue.400'} h={'max-content'} _hover={{color:"white"}}  isLoading={isUpdating}>
                       {isFollowing? "UnFollow" : "Follow"}
                       </Button> }
         

            
        </Flex>
 
    )
}