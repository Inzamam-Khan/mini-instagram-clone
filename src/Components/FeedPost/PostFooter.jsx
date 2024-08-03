import { Flex,Box ,Text, InputGroup,Input, Button,InputRightElement, useDisclosure} from "@chakra-ui/react"
import { useState } from "react"
import { CiShare2 } from "react-icons/ci"

import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa"
import { MdAddComment } from "react-icons/md"
import { usePostComment } from "../../Hooks/usePostComment"
import { useSelector } from "react-redux"
import { useLikePost } from "../../Hooks/useLikePost"
import { ShowCommentsModal } from "../../ShowCommentsModal/ShowCommentsModal.jsx"

export const PostFooter=({isProfilePage,post,userProfile})=>{
    
    // post is post

    const {postComment,isLoading}=usePostComment()
    const {isOpen,onClose,onOpen}=useDisclosure()
    
    
   
    const [comment,setComment]=useState("")
    const {likePost,likes,isLiked} =useLikePost(post)

    const authUser=useSelector(state=>state.User)
    

    
    
    
    return(
        <Box my={2}  borderBottom={'.1rem solid gray'}pb={4}>

        <Flex align={'center'} gap={4} w={"full"} p={1} mb={1}  >

            <Button cursor={'pointer'} fontSize={18} onClick={likePost} >
                {!isLiked?<FaRegHeart  fill={"#0353a4"} />:<FaHeart   fill="red"/>}
            </Button>

            <Box cursor={"pointer"}>
                <MdAddComment fontSize={18} fill={"#0353a4"} />
            </Box>

            <Box cursor={'pointer'} fontSize={18} >
            <FaShare fill={"#0353a4"} />
            </Box>
        </Flex>

        <Text fontWeight={600} fontSize={"sm"}>
            {likes} likes...
        </Text>

       {!isProfilePage && 
       <>
        <Text fontSize={'sm'} fontWeight={700}>{`${userProfile?.fullName} :- ${post?.caption}`} </Text>
        
        

        <Text fontSize={'sm'} color={'gray'} cursor={'pointer'} onClick={onOpen}>
            View all {post?.comments?.length} Comments...
        </Text>
       
       </>
       }
       {/*  */}

       {isOpen ? (
        <Flex   border={'2px solid white'}>
            <ShowCommentsModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} post={post} userProfile={userProfile}/>
        </Flex>

        
       ):'' }















{/*  */}
                { authUser && 
                <Flex align={'center'} _focus={{borderBottom:'1px solid gray'}} gap={2} justify={'space-between'} w={"full"}>
                <InputGroup>
                
                <Input variant={"flushed"} value={comment} onChange={(e)=>{setComment(e.target.value)}} borderBottom={""} outline={"none"}bg={"transparent"} placeholder="Add a Comment..." fontSize={14}/>
                {comment.length>0 &&  <InputRightElement>
                <Button color={'blue.500'} cursor={'pointer'} transition={'.2s ease-in-out'}  fontSize={14} 
                fontWeight={"bold"} _hover={{bg:'transparent',color:'white'}} onClick={()=>{postComment(comment,post.id);setComment('')}} isLoading={isLoading}>Post</Button>
                </InputRightElement> }
               
                </InputGroup>
            </Flex>
                }
        


        </Box>
    )
}


