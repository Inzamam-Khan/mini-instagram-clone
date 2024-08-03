

import {Avatar,Button,Center,Flex,FormControl,FormLabel,
    Heading,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,
    ModalOverlay,Stack
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePreviewImage } from '../../Hooks/usePreviewImage'
import { useEditProfileModal } from '../../Hooks/useEditProfileModal'



export const EditProfileModal=({isOpen,onClose})=>{
    const {isUpdating,editProfile}=useEditProfileModal()
    const authUser=useSelector(state=>state.User)
    const selectFileRef=useRef()
    const [inputs,setInputs]=useState({
        fullName:authUser.fullName || '',
        userName:authUser.userName || "",
        bio:authUser.bio || ''

    })

    const {handleImageChange,selectedFile,setSelectedFile}=usePreviewImage()

    const handleEditProfile=async(e)=>{
        e.preventDefault()
        await editProfile(inputs,selectedFile)
        setSelectedFile(null)
        
        onClose()
    }


   
    


    
    return(<>
    <Modal isOpen={isOpen} onClose={onClose} >

        <ModalOverlay bg='blackAlpha.300'   backdropFilter='blur(20px) '/>
        <ModalContent borderRadius={'2em'} p={2} border={'1px solid gray'} bg={'black'} boxShadow={'xl'} my={'auto'} mx={'auto'}   w={{base:'full',sm:'60vW',md:'40%'}} position={'relative'}>
            <ModalHeader/>
            <ModalCloseButton position={'absolute'} _hover={{color:"red"}} right={'2em'} top={'2em'}/>
            <ModalBody borderRadius={'2em'}  border={'1px solid gray'} w={'full'} >
                {/* conatainer flex */}
                <Flex bg={'black'}   >

                
                    <Stack spacing={5}  w={'full'} maxW={'md'} bg={'black'} p={6} my={0} align={'center'} justify={'center'}>
                        
                    <Heading lineHeight={1.1} fontSize={{base:'2xl',sm:'3xl'}} color={'blue.500'}>
                            Edit Profile
                        </Heading>

                        <FormControl >

                            <Stack direction={['column','row']} spacing={6}>
                                <Center>
                                    <Avatar w={'7em'} src={selectedFile || authUser.profilePicURL} border={'2px solid white'}/>
                                </Center>

                                <Center w={'full'}>
                                    <Button onClick={()=>selectFileRef.current.click()} bg={'whiteAlpha.300'} borderRadius={6} p={1} _hover={{bg:'whiteAlpha.500'}} w={'full'}>Edit Profile Picture</Button>
                                </Center>
                                <Input ref={selectFileRef} type={'file'} hidden onChange={handleImageChange}  />
                            </Stack>

                        </FormControl>


                        <FormControl >
                            <FormLabel fontSize={'sm'}>Full Name</FormLabel>
                            <Input value={inputs.fullName} onChange={(e)=>setInputs({...inputs,fullName:e.target.value})} outline={'none'} color={'blue.400'} placeholder='Full Name' size={'sm'} type={'text'} my={2} borderRadius={6}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize={'sm'}>User Name</FormLabel>
                            <Input value={inputs.userName} onChange={(e)=>setInputs({...inputs,userName:e.target.value})} outline={'none'} color={'blue.400'} type={'text'} placeholder='User Name' size={'sm'} my={2} borderRadius={6}/>
                        </FormControl>
                        
                        <FormControl>
                            <FormLabel fontSize={'sm'}>Bio</FormLabel>
                            <Input value={inputs.bio} onChange={(e)=>setInputs({...inputs,bio:e.target.value})} outline={'none'} color={'blue.400'} type={'text'} placeholder='Bio' size={'sm'} my={2} borderRadius={6}/>
                        </FormControl>

                        <Stack spacing={6} direction={['column','row']}>
                            <Button onClick={onClose} bg={'red.400'} color={'white'} w={'full'} size={'sm'} px={2}
                            _hover={{bg:'red.500'}}  borderRadius={6}>Cancel</Button>

                            <Button onClick={handleEditProfile} bg={'blue.400'} color={'white'}
                            size={'sm'} w={'full'} _hover={{bg:'blue.500'}} px={2} borderRadius={6}>
                                Submit
                            </Button>

                        </Stack>

                    </Stack>


                </Flex>


            </ModalBody>
        </ModalContent>

        
    </Modal>
    </>)
}