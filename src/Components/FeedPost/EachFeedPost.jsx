import { Box, Flex, Image } from "@chakra-ui/react"
import { PostFooter } from "./PostFooter"
import { PostHeader } from "./PostHeader"
import demoPost_1 from '../../assets/demoPost_1.png'
import { useGetUserProfileById } from "../../Hooks/useGetUserProfileById"
import { useEffect } from "react"

export const EachFeedPost = ({ post }) => {

    const { userProfile,getUserProfileById } = useGetUserProfileById()
    

    useEffect(()=>{
        getUserProfileById(post.createdBy)

    },[post])


    return (
        <>
            <PostHeader post={post} userProfile={userProfile}/>
            <Box mt={4} overflow={'hidden'}  borderRadius={6}  >
                <Image src={post?.imageURL} border={".1rem solid #979dac"} alt="" w={'full'} />
            </Box>
            <PostFooter post={post} userProfile={userProfile} />

        </>
    )
}