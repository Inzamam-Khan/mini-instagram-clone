import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input,Button, InputGroup, InputRightElement, Alert, AlertIcon } from "@chakra-ui/react"
import { useState } from "react"
import { useSignup } from "../../Hooks/useSignup"


export const Signup=()=>{
    

const [inputs,setInputs]=useState({
        email:"",
        password:"",
        fullName:"",
        userName:""
    })

    const {loading,error,signup}=useSignup()
    

    const [showPassword,setShowPassword]=useState(false)

    
    return(
        <>
        <Input 
        placeholder="Email"
        fontSize={14} type="email" outline={"none"} w={"full"} padding={2} borderRadius={"full"} value={inputs.email} onChange={(e)=>{setInputs({...inputs,email:e.target.value})}}/> 
       
       <Input 
        placeholder="Username"
        fontSize={14} type="text" outline={"none"} w={"full"} padding={2} borderRadius={"full"} value={inputs.userName} onChange={(e)=>{setInputs({...inputs,userName:e.target.value})}}/> 
       
       <Input 
        placeholder="Fullname"
        fontSize={14} type="text" outline={"none"} w={"full"} padding={2} borderRadius={"full"} value={inputs.fullName} onChange={(e)=>{setInputs({...inputs,fullName:e.target.value})}}/> 
       

            <InputGroup>

            <Input  placeholder="Password" outline={"none"} w={"full"} padding={2} borderRadius={"full"} fontSize={14} type={showPassword? "text" : "password"} value={inputs.password} onChange={(e)=>{setInputs({...inputs,password:e.target.value})}}/>

            <InputRightElement>
            <Button  onClick={()=>{setShowPassword(!showPassword)}} top={2.5} right={3}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon/>}

            </Button>
            
            </InputRightElement>
            </InputGroup>



            {error && 
            <Alert status='error' fontSize={13} p={2} borderRadius={4}  >

                <AlertIcon fontSize={12} w={'14px'} color={'red'} mr={2}/>
                {error.message}
            </Alert>
            }
        
        
           


        

<Button onClick={()=>signup(inputs)} isLoading={loading}  w={"full"} h={"35px"}bg={"blue.500"} borderRadius={"full"} size={"sm"} fontSize={14}>
                Signup
                </Button>


        </>

 
    )
}