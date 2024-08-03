import { Box, Flex,Text } from "@chakra-ui/react"
import { BiBookBookmark, BiBookmark } from "react-icons/bi"
import { BsGrid3X3, BsHeartFill } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"

export const ProfileTabs=()=>{
    return (
        <Flex w={'full'} justify={'center'} gap={{base:4,sm:10}} textTransform={"uppercase"} fontWeight={'bold'}>

            <Flex borderTop={'2px solid gray'} align={'center'} p={3} gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <BsGrid3X3/>
                </Box>

                <Text fontSize={12} display={{base:'none',sm:"block"}}>
                    Posts
                </Text>

                </Flex>

                <Flex  align={'center'} p={3} gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <BiBookmark/>
                </Box>

                <Text fontSize={12} display={{base:'none',sm:"block"}}>
                    Saved
                </Text>

                </Flex>
            
                <Flex  align={'center'} p={3} gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <FaRegHeart/>
                </Box>

                <Text fontSize={12} display={{base:'none',sm:"block"}}>
                    Likes
                </Text>

                </Flex>
            
            
        </Flex>
    )
}