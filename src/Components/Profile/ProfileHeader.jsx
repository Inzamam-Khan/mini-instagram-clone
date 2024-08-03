import { AvatarGroup, Avatar,Button, Flex, Text,Box, VStack, useDisclosure } from "@chakra-ui/react"

import { useSelector } from "react-redux"
import { EditProfileModal } from "./EditProfileModal"
import { useFollowUser } from "../../Hooks/useFollowUser"
export const ProfileHeader=({user})=>{
    
    

    const logedInUser=useSelector((state)=>state.User)
    const {isOpen,onClose,onOpen}=useDisclosure()

    const {isFollowing,isUpdating,handleFollowUser}=useFollowUser(user.uid)
    
    

    const visitingOwnProfile=logedInUser && logedInUser.userName === user.userName
    const visitingAnotherUserProfile=logedInUser && logedInUser.userName !== user.userName
    
    
    return (
    <Flex gap={{base:4,sm:10}}  direction={{base:"row",sm:"row"}}  align={"center"}>

        {/* left side */}
        
            <Avatar name={user?.fullName} border={'1px solid gray'} w={{base:"5em",sm:"8em"}} h={{base:'5em',sm:'8em'}} src={user?.profilePicURL || ""} alt="hazer" />
        

        {/* right side */}

        <VStack alignItems={'start'} gap={2} mx={"auto"} flex={1}>

        <Flex gap={4}  direction={"row"} justifyContent={{base:'center',sm:'flex-start'}} align={'center'} w={'full'}>

            <Text fontSize={{base:'sm',md:'lg'}}>{user.fullName}</Text>

                { visitingOwnProfile && 
                 <Flex gap={4} alignItems={'center'} justify={"center"}>
                <Button onClick={onOpen} px={2} bgGradient={'linear(to-l, #7928CA, #FF0080)'}  color={"#dec9e9"} borderRadius={6} _hover={{bgGradient:'linear(to-r, gray.300, yellow.400, pink.200)' ,color:'black',transition:".1s ease-in-out"}} size={{base:"sm",md:"sm"}}>
                    Edit Profile
                </Button>
                </Flex>
                }


{ visitingAnotherUserProfile && 
                 <Flex gap={4} alignItems={'center'} justify={"center"}>
                <Button onClick={handleFollowUser} isLoading={isUpdating} px={2} bgGradient={'linear(to-l, #7928CA, #FF0080)'}  color={"#dec9e9"} borderRadius={6} _hover={{bgGradient:'linear(to-r, gray.300, yellow.400, pink.200)' ,color:'black',transition:".1s ease-in-out"}} size={{base:"sm",md:"sm"}}>
                    {isFollowing ? 'UnFollow' : 'Follow'}
                </Button>
                </Flex>
                }
           
            
            
        </Flex>


        <Flex align={'center'} gap={{base:2,sm:4}}>
            <Text fontSize={{base:"xs",md:"sm"}}>
                <Text as="span" fontWeight={'bold'} mr={1}>{user?.posts?.length || 0}</Text>
                Posts
            </Text>

            <Text fontSize={{base:"xs",md:"sm"}}>
                <Text as="span" fontWeight={'bold'} mr={1}>{user?.followers?.length}</Text>
                Followers
            </Text>

            <Text fontSize={{base:'xs',md:'sm'}}>
                <Text as="span" fontWeight={'bold'} mr={1}>{user?.following?.length}</Text>
                Following
            </Text>

        </Flex>


        {/* user bio section */}

        <Flex align={"center"} gap={4}>
            <Text fontSize={'sm'} fontWeight={"bold"}>{user?.userName}</Text>

        </Flex>
        <Text fontSize={'sm'}>{user.bio}</Text>
        

        </VStack>



        {isOpen && <EditProfileModal isOpen={isOpen} onClose={onClose}/>}

    </Flex>
    )
}