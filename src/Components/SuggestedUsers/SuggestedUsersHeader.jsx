import { Avatar,Button, Flex,Text,Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useLogout } from "../../Hooks/useLogout"

export const SuggestedUsersHeader=({authUser})=>{

    const {handleLogout,isLoggingOut}=useLogout()
    return(
        <Flex justify={'space-between'} align={'center'} w={'full'} >

            <Flex align={'center'} gap={3} >
                <Avatar name={authUser?.fullName}  w={'3em'} h={'3em'} src={authUser?.profilePicURL}/>
                <Text fontSize={12} fontWeight={"bold"} textTransform={'capitalize'}>{authUser?.fullName}</Text>

            </Flex>


            <Button fontSize={14} isLoading={isLoggingOut} onClick={handleLogout}
            fontWeight={'medium'} color={'blue.400'} cursor={'pointer'} style={{textDecoration:'none'}} 
            >
                Logout
            </Button>
        </Flex>
    )
}