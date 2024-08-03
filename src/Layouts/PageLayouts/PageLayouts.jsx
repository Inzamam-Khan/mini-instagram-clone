import { useLocation } from "react-router-dom"

import { Flex, Box,} from  "@chakra-ui/react"
import { Sidebar } from "../../Components/Sidebar/Sidebar"
import { useSelector } from "react-redux"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../Firebase/Firebase"
import { Navbar } from "../../Components/Navbar/Navbar"

export const PageLayout=({children})=>{
    const {pathname}=useLocation()
    // const user=useAuthState(auth)
    const user=useSelector(state=>state.User)
    const renderSideBar = pathname !== '/auth' && user
    const renderNavBar=pathname !=='/auth' &&  !user
    
    
    
    return (
        

        <Flex flexDirection={renderNavBar? "column" :"row"} >
            {/* side bar on left */}
            {renderSideBar ? (
                    
            <Box w={{base:'20px',md:"170px"}} ml={2} mt={{base:8,sm:'4.1em'}} position={{base:'absolute',sm:'relative'}} >
                
            <Sidebar/>
        </Box>


            ):null}

            {renderNavBar ? <Navbar/> : null}




            {/* content on right */}

            <Box flex={1} w={{base:"calc(100%- 70px)",md:"calc(100% - 300px)"}} mx={"auto"} >
            {children}
            </Box>
        </Flex>


    )
}