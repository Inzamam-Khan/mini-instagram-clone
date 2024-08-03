import { Avatar, Box, Divider, Flex, GridItem, Image, Text, VStack, useDisclosure,Button } from "@chakra-ui/react"
import { FaCommentDots, FaHeart } from "react-icons/fa"
import userLogo from '../../assets/userLogo.png'
import { PostFooter } from '../FeedPost/PostFooter'
import {
  Modal,
  ModalOverlay,
  ModalContent,


  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { MdDelete } from "react-icons/md"
import { Comment } from "../Comment/Comment"
import { useGetUserPosts } from "../../Hooks/useGetUserPosts"
import { useSelector } from "react-redux"
import { useDeletePost } from "../../Hooks/useDeletePost"
import { timeAgo } from "../../utils/timeAgo"

export const ProfilePost = ({ item={}, username = "", isSearchPage, }) => {
  // item is post 

  const visitingProfileUser = useSelector(state => state.visitingProfileUser)
  const authUser=useSelector(state=>state.User);
  

  const { caption, likes, comments, createdBy, imageURL,id } = item
  const {deletePost}=useDeletePost()


  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>


      <GridItem onClick={onOpen} borderRadius={6} cursor={'pointer'} overflow={'hidden'} position={'relative'} 
        aspectRatio={1 / 1} >

        <Flex opacity={0} _hover={{ opacity: 1 }} position={"absolute"} 
          width={"full"} height={"full"} bg={'blackAlpha.700'} transition={'all 0.3s ease'} justifyContent={"center"} 
        >
          <Flex alignItems={'center'} justify={'center'} gap={{base:'3em',md:'35%'}} >

            {/* no of likes */}
            <Flex align={'center'} gap={2}>
              <FaHeart size={20} />
              <Text fontWeight={"bold"} >{likes?.length}</Text>

            </Flex>

            {/* no of comments */}
            <Flex align={'center'} gap={1}>
              <FaCommentDots size={20} />
              <Text fontWeight={"bold"} />{comments?.length}
            </Flex>

          </Flex>

        </Flex>


        {isSearchPage && <Flex justify={'space-between'} px={2} my={2} bg={'whiteAlpha.200'} borderRadius={8}>
          <Text fontSize={14} color={'whiteAlpha.800'}>{username}</Text>
          <Text fontSize={12} color={'gray'}>1d Ago...</Text>
        </Flex>}



        {/* ------------------------------------------------------------------------------ */}


        <Image src={imageURL} alt={'profile post'} width={'100%'} height={'100%'} objectFit={"cover"} />
        {/* ------------------------------------------------------------------------------------------ */}

      </GridItem>

      {/*
------------
------------
------------
------------
------------
------------
------------
------------*/}

      <Modal isOpen={isOpen} onClose={onClose}
        isCentered={true} size={{ base: 'xs', md: 'sm' }}>




        <ModalContent   >




          <ModalBody  bg={"blackAlpha.900"} my={'auto'} mx={'auto'} position={'relative'}>

            <Flex gap={2} w={{ base: '90%', sm: "70%", md: 'full' }} align={'center'}
              >

              {/* left side content ie image part */}
              <Box borderRadius={6} overflow={'hidden'}  flex={1.5} ml={6} w={{ base: '100vW', sm: 'sm' }} >
                <Image src={imageURL}  alt={"profile post"} w={'full'} h={'80VH'} objectFit={'contain'} />
              </Box>



              {/* right side content ie comment section*/}

              <Flex flex={1} mr={6} flexDirection={'column'} px={10} display={{ base: 'none', md: 'flex' }} height={'full'}>

                {/* header */}
                <Flex align={'center'} justify={"space-between"} pt={4}>

                  {/* left side of header */}


                  <Flex align={'center'} gap={4} >
                    <Avatar src={visitingProfileUser.profilePicURL} width={'2.5em'} h={'2.5em'} border={'1px solid gray'}  />
                    <Text fontWeight={'bold'} fontSize={12}>
                      {visitingProfileUser.userName}
                    </Text>

                  </Flex>

                  {/* right side of header  */}
                  <Flex gap={6} borderRadius={4} p={1} >

                    <Button _hover={{ bg: 'WhiteAlpha.300', color: 'red.600' }}  >
                     
                     {authUser.uid === visitingProfileUser.uid &&
                      <MdDelete size={20} cursor="pointer" onClick={()=>deletePost(item)}  />}
                    </Button>
                  </Flex>







                </Flex>



                <Divider m={3} borderBottom={'1px solid gray'} />
                {/* --------------------------------------------------------------------------------------------------------------------------------------------- */}
               
                {caption && <>
               
                <Flex direction={'column'}>




                    {/* left side of header */}

                    
                    <Flex align={'center'} gap={4} >
                      <Avatar src={visitingProfileUser.profilePicURL} width={'2.5em'}  h={'2.5em'}border={'1px solid gray'} />
                      <Text fontWeight={'bold'} fontSize={12} >
                        {visitingProfileUser.userName}
                      </Text>

                    </Flex>
                  

                
                  <Box  my={3} px={2} >
                  <Text fontSize={13} color={'whiteAlpha.900'}>
                    {caption}
                    
                    
                    </Text>
                    <Text fontSize={10} color={'gray.400'} mt={2}>{timeAgo(item.createdAt)}</Text>
                    </Box>
                    

                
                </Flex>
                <Divider m={3} borderBottom={'1px solid gray'} />
                </>}

                <VStack w="full" align={'start'} h={"300px"} overflow={'auto'} mt={'1em'}>


                    {item.comments?.map((comment,index)=>
                    
                         <Comment key={index} comment={comment} />
                    )}
                
                  
                          

                </VStack>

                <Divider m={3} borderBottom={'1px solid gray'} />

                <PostFooter isProfilePage={true} post={item} />

              </Flex>

              <ModalCloseButton _hover={{ bg: 'WhiteAlpha.300', color: 'red.600' }} top={{base:"-2.3em",sm:'1.7em'}} right={{base:"3em",sm: "7em", md: '2.5em' }} position={'absolute'}  />

            </Flex>

          </ModalBody>




        </ModalContent>
      </Modal>
    </>

  )
}