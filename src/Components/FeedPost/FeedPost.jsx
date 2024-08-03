import { Container } from "@chakra-ui/react"
import { EachFeedPost } from "./EachFeedPost"
import { useGetFeedPosts } from "../../Hooks/useGetFeedPosts"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const FeedPost=()=>{
    const {getFeedPosts,posts,isLoading}=useGetFeedPosts()
    const authUser=useSelector(state=>state.User)
    const postState=useSelector(state=>state.userPost)
    

    useEffect(()=>{
        getFeedPosts()
    },[authUser,postState])

    return (
        <Container maxW={"container.sm" } py={10} px={1} mr={3} >
            {posts?.map(post=>
                     <EachFeedPost key={post.id} post={post}/>
            )}
            
           
            

        </Container>
    )
}


