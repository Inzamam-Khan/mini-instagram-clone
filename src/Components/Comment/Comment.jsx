import { Avatar, Flex, Text } from "@chakra-ui/react"
import { useGetUserProfileById } from "../../Hooks/useGetUserProfileById"
import { useEffect } from "react";
import { timeAgo } from "../../utils/timeAgo";

export const Comment=({comment})=>{
    


    const {getUserProfileById,userProfile}=useGetUserProfileById();






    useEffect(()=>{
            getUserProfileById(comment?.createdBy)
    },[comment])

    

    return(
        <Flex gap={4} >

{/* left side ie userAvatar */}
<Avatar src={userProfile?.profilePicURL} name={userProfile?.fullName} w={'10'} border={'1px solid gray'} borderRadius={'full'} />




{/* right side ie userName & comment */}

<Flex direction={'column'}>
    <Flex  align={'center'} justify={'space-between'}  gap={'1em'}>
        <Text fontWeight={"bold"} fontSize={12}>
            {`${userProfile?.fullName} :-`}
        </Text>
        <Text fontSize={14}>
            {comment?.comment}
        </Text>
    </Flex>
    <Text fontSize={12} color={'gray'}>
        {timeAgo(comment.createdAt)}
    </Text>

    
</Flex>


        </Flex>
    )

}