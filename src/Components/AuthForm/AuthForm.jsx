import { Box, Button, Image, Input, Text, VStack,Flex } from "@chakra-ui/react"
import instagramLine from '../../assets/instagramLine.svg'
import { useState } from "react"

import { useNavigate } from "react-router-dom"
import {Login } from './Login';
import { Signup } from "./Signup"
import { GoogleAuth } from "./GoogleAuth"
export const AuthForm =()=>{
    const Navigate=useNavigate();
    
    const [isLogin,setIsLogin]=useState(true);
   
    

// const handleAuth=(e)=>{
//     e.preventDefault();
//     if(!inputs.email || !inputs.password )
//         {
//             alert("All fields Requuired")
//             return;

//         }
//         Navigate('/')
//     console.log(inputs)

// }


    return(
      <>
      <Box bg={"gray.900"} borderRadius={20} padding={{base:'3',md:'2'}} w={{base:'90vW',md:'auto'}} h={{base:"24rem",md:'auto'}} marginY={{base:'3rem',md:"auto"}}>
       
        <VStack gap={{base:5,md:"3"}}>
            <Image src={instagramLine} h={20} cursor={"pointer"} alt="Instagram" w={"full"}/>
           
           {isLogin ? <Login /> : <Signup/>}
          
        

                <Flex alignItems={"center"} justifyContent={"center"} my={2} gap={1} w={"full"}>
                    <Box flex={2} h={"1px"} bg={"gray.400"}/>
                    <Text mx={1} color={"white"}>OR</Text>
                    <Box flex={2} h={"1px"} bg={"gray.400"}/>

                </Flex>

                    <GoogleAuth/>


        </VStack>

      </Box>

                <Box paddingX={5} marginY={{base:2,md:"auto"}}> 
                    <Flex align={"center"} justifyContent={"center"}>
                        <Box mx={2} fontSize={14}>
                            {isLogin? "Don't Have an account?":"Already have an account?"}
                            </Box> 

                        <Box color={"blue.500"} cursor={"pointer"} onClick={()=>{setIsLogin(!isLogin)}}>
                            {isLogin? "Signup":"Login"}
                        </Box>
                    </Flex>

                </Box>



      </>
    )
}
