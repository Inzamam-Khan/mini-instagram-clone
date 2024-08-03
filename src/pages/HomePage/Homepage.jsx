import { Box, Container, Flex } from "@chakra-ui/react"
import { FeedPost } from "../../Components/FeedPost/FeedPost"
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers"

export const Homepage=()=>{
    return(
       <Container maxW={"container.lg"} mx='auto'  pl={6} >
        <Flex gap={20}>
            {/* feeds  */}
            <Box flex={2} py={10}>
                
                <FeedPost/>
                </Box>
              

            {/* suggested users */}
            
            <Box flex={3} mr={2} display={{base:'none',lg:'block'}} maxW={"300px"} w={'full'}> 
                <SuggestedUsers/>
            </Box>
        </Flex>
       </Container> 

    )
}