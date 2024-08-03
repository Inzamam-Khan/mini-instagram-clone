import {  Box, Button, useDisclosure} from "@chakra-ui/react"


// 
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useLogout } from "../../Hooks/useLogout";
import { SidebarItems } from "./SidebarItems";

//   

export const Sidebar=()=>{
    
    const { isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()
    const [showSideBar,setShowSideBar]=useState(false)
    


    const handleSideBar=()=>{
      
    setTimeout(() => {
      
      onClose()
    },
     (9000));
    }
    
    return(
        <>

<Box display={{base:'none',md:'block'}} >
<SidebarItems/>
</Box>











        <Button ref={btnRef} color={'#b5179e'}  onClick={onOpen} display={{base:'block',md:'none'}}  >
          
          {!showSideBar || !isOpen ? <RxHamburgerMenu onClick={()=>{setShowSideBar(true);handleSideBar()}}  /> : null }
          
          
        </Button>
        
        <Box >
            {showSideBar ? 
             <Drawer blockScrollOnMount={{base:'true',sm:"false"}}
           isOpen={isOpen} placement={"left"} onClose={onClose}  >
          <DrawerOverlay bg='blackAlpha.300'   backdropFilter='blur(20px)'
      />
          <DrawerContent  maxWidth={{base:'70px',md:'200px'}} maxH={'auto'} >
            {/* <DrawerCloseButton display={{base:'block',md:'none'}} color={'red'} position={"absolute"} right={'0em'} top={'0em'} /> */}
            
  
            <DrawerBody   >

                <SidebarItems showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>

            </DrawerBody>
  
          </DrawerContent>
        </Drawer> : null}
        </Box>
       
      
      </>
       
    )
}









// function DrawerExample() {
 
  
//     return (
     
//     )
//   }