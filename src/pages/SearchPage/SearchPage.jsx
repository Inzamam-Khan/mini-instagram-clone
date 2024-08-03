import { Button,Box,Input,InputRightElement,Text, Container,Flex, InputGroup, Grid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import abstractblurgradientbackgroundvector from '../../assets/abstractblurgradientbackgroundvector.jpg'
import { ProfilePost } from "../../Components/Profile/ProfilePost"
import gradientlakescenery from '../../assets/gradient-lake-scenery_23-2149151146.avif'
import beautiful_gradient_spring_landscape from '../../assets/beautiful-gradient-spring-landscape.avif'
import { CiSearch } from "react-icons/ci"
import { useSearchUser } from "../../Hooks/useSearchUser"
import { SuggestedUser } from "../../Components/SuggestedUsers/SuggestedUser"
import { useGetuserProfileByUsername } from "../../Hooks/useGetuserProfileByUsername"
export const SearchPage=()=>{
    const [searchValue,setSeachValue]=useState('')

    // const {searchUser,isLoading,getUserProfile,setSearchUser}=useSearchUser()

    const {searchUser,getUserProfile,isLoading,setSearchUser}=useGetuserProfileByUsername()
    
    const handleSearchUser=(e)=>{
        e.preventDefault();
        getUserProfile(searchValue)

    }
    
    return(
        <Container w={'full'} >

            <Flex direction={'column'} px={{base:"none",sm:2}} align={'center'}  mx={'auto'} maxW={'full'}>

                    <Box display={'flex'} justifyContent={{base:'center',sm:'center'}} mt={7}   w={{base:'xs',sm:'lg'}}>
                    
                <Input type="text" autofill={'true'} outline={'none'} bg={'whiteAlpha.300'} value={searchValue} onChange={(e)=>setSeachValue(e.target.value)} _focus={{bg:"whiteAlpha.500"}} borderRadius={8}  placeholder="Search" px={2} textColor={'whiteAlpha.800'} w='full' />
                
                <Button cursor={'pointer'} isLoading={isLoading} px={2} color={'blue.400'} ml={'2em'} _hover={{bg:'whiteAlpha.300'}} onClick={handleSearchUser} borderRadius={6}><CiSearch size={'1.2em'}   /></Button>
                
                
                

                    </Box>


                { !searchUser ?  <Box  display={{base:'hidden',sm:'grid'}} mt={4} w={'100%'} >
                        
                        <Grid templateColumns={{sm:'repeat(1,1fr)',md:"repeat(5,1fr)"}} mt={6}  
         gap={4} columnGap={4}>
<ProfilePost imageItem={gradientlakescenery} isSearchPage={true}/>




        </Grid>
                        </Box> :
                        <Flex  w={'100%'}  px={{base:'2em',lg:'16em'}} mt={8} >
                                <SuggestedUser item={searchUser} setSearchUser={setSearchUser} />
                        </Flex>
                        
                        }

                       
      
               

            </Flex>
        </Container>
    
    )
}