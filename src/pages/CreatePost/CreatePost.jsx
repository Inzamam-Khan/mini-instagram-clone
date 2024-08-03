import { Box, Container, Flex,Button,Image,Text,Input, Textarea, InputGroup, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { usePreviewImage } from "../../Hooks/usePreviewImage";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCreatePost } from "../../Hooks/useCreatePost";
import { useNavigate } from "react-router-dom";

export function CreatePost(){
   
    const ImageRef=useRef()

    const {selectedFile,setSelectedFile,handleImageChange}=usePreviewImage()

    const [caption,setCaption]=useState('')
    
    const {isLoading,createPost,error}=useCreatePost()
    const navigate=useNavigate()

    const handlePostCreation=async()=>{
        if(isLoading) return;
        await createPost(selectedFile,caption)
        if(error) throw new Error(error.message)
        setSelectedFile('');
        setCaption('');
        navigate('/')
    }


    
    return(
        <Container w={{base:'container.xs',md:'container.sm'}} position={'relative'} border={'2px solid red'} h={'100vH'} mx={'auto'} >
           
            

            <Flex direction={'column'} gap={6} flex={1} >

                {/* image selection  */}
                <Flex flex={1} justify={'center'} align={'center'} my={'3em'} >
                    {!selectedFile ? 
                      <Box display={'block'} align={'center'} w={'50%'}  h={'50vH'} py={'8em'} bg={'whiteAlpha.200'} borderRadius={8}  border={'2px solid white'}>
                   
                       
                      <Text align={'center'}   mb={2} >
                      Select File... 
                      </Text>
                      <Box onClick={()=>ImageRef.current.click()} _hover={{color:'blue.400',cursor:'pointer'}} w={'max-content'}  >
                          <Input type="file" ref={ImageRef} hidden onChange={handleImageChange}/>
                      <FaImages />
                      
                      </Box>
                          
                  </Box>
                  :
                  <>
                  <Button onClick={()=>setSelectedFile(null)} position={'absolute'} right={'1em'} top={'1em'} _hover={{color:'red'}}>
                  <IoCloseCircleOutline size={'1.5em'}/>
                  </Button>
                  <Image src={selectedFile} w={'auto'} h={'50vH'} borderRadius={8}  border={'2px solid white'} objectFit={'cover'}/>  
                      
                  </> 
                
                }
                

                  
                    
                </Flex>



                            {/* post caption... */}
                <Flex flex={1} justify={'center'} align={'center'}>
                    <Textarea value={caption} onChange ={(e)=>setCaption(e.target.value)} placeholder="Post Caption..." px={3} w={'md'} lineHeight={'30px'} outline={'none'} borderRadius={8} minH={'1em'} maxH={'auto'}  />
                    <Button onClick={handlePostCreation} isLoading={isLoading} color={'blue.400'} _hover={{color:'white'}} p={2} fontSize={14} h={'max-content'} >Post</Button>
                </Flex>

            </Flex>

        </Container>
    )
}