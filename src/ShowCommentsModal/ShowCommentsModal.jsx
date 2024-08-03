
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,Input,Button
  } from '@chakra-ui/react'
import { Comment } from '../Components/Comment/Comment'
import { usePostComment } from '../Hooks/usePostComment'
import { useEffect, useRef } from 'react'





export const ShowCommentsModal=({isOpen,onOpen,onClose,post,userProfile})=>{
    
        
    const {postComment,isLoading}=usePostComment()
    const inputRef=useRef('')
    const scrollRef=useRef('')

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
       await postComment(inputRef.current.value,post.id)
        inputRef.current.value=''
    }

    const handleScrollRef=()=>{
        scrollRef.current.scrollTop=0

    }

    useEffect(()=>{
        if(isOpen){
            setTimeout(()=>{
                handleScrollRef()
            },100)
        }
    })
    
    return(
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop" blockScrollOnMount={true} >
            <ModalOverlay bg='blackAlpha.300'   backdropFilter='blur(20px)' />
            <ModalContent maxW={{base:"full",md:'50%'}} minWidth={'400px'} mx={{base:'none',md:'25%'}}>

                
                
                
                <ModalBody pb={6} my={'auto'}  position={'relative'} mb={'20em'} mx={'auto'} minW={'400px'} >
                <ModalHeader mb={4} align={'left'} fontSize={'1.5em'} >Comments</ModalHeader>
                <ModalCloseButton _hover={{color:"red"}} position={'absolute'} right={'0em'} top={'.8em'}/>
                    <Flex mb={4} ref={scrollRef} gap={3} flexDirection={'column'} h={'350px'} overflowY={'auto'}  border={'1px solid '} p={4} borderColor={'gray.900'} borderRadius={8} >
                        
                        {
                            post.comments.sort((a,b)=>b.createdAt - a.createdAt).map((comment,index)=>
                                
                             <Comment key={index} comment={comment}/> 
                                
                            )
                        }
                        
                    


                    </Flex>


                    <form onSubmit={handleFormSubmit} > 
                        
                        <Flex w={'full'} justify={'space-around'} align={'center'} >
                        <Input ref={inputRef} placeholder="Comment"  maxH={'1.7em'} borderRadius={6} outline={'none'} px={2} />
                            <Button isLoading={isLoading} type={'submit'}  size={'sm'} my={4} _hover={{color:'blue.400'}} >
                                Post
                            </Button>
                        </Flex>
                    </form>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}