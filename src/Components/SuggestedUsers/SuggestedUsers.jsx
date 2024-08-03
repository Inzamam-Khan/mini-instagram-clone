import { useSelector } from "react-redux"
import { SuggestedUsersHeader } from "./SuggestedUsersHeader"
import { Flex, VStack,Text,Link,Box } from "@chakra-ui/react"
import { useGetSuggestedUsers } from "../../Hooks/useGetSuggestedUsers"
import { SuggestedUser } from "./SuggestedUser"
import { Link as RouterLink} from "react-router-dom"

export const SuggestedUsers=()=>{
    const authUser=useSelector(state=>state.User)
    const {suggestedUsers}=useGetSuggestedUsers()
    
    return(

        <VStack py={8} px={6} gap={4}  w={'19em'} position={'fixed'} borderLeft={'1px solid '} borderColor={'gray.900'} right={"5.5em"} mt={'3em'}>
                <SuggestedUsersHeader authUser={authUser}/>

                { suggestedUsers && <Flex align={'center'} justify={'space-between'} w={'full'} overflow={'auto'}>
                    <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                        Suggested For You
                    </Text>
                    <Text fontSize={12} fontWeight={'bold'}   _hover={{color:'gray.400'}} cursor={'pointer'}>
                        See All
                    </Text>

                    


                </Flex> }
                        
                        {suggestedUsers.map((item,index)=>
                        <>
                        <SuggestedUser key={index} item={item}/>
                        {index!==suggestedUsers.length-1 && <Box bg={'gray.900'} h={'1px'} w={'full'} mb={'1'}></Box> }
                    
                    </>)}
                        
                        
                       
                        
                        
                        
               
                

                    <Flex  color={'gray.500'} fontSize={12} mt={'5'} borderBottom={'1px solid gray'} gap={'2'} align={'center'}>
                        
                        <Link as={RouterLink} to={'https://github.com/Inzamam-Khan/'}  target="_blank" color="blue.500" fontSize={14}>More About Me...</Link>
                    </Flex>

                
        </VStack>
        
    )
}