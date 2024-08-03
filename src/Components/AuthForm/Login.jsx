import { Input,Button ,InputRightElement,InputGroup,Alert,AlertIcon} from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useLogin } from "../../Hooks/useLogin"
export const Login=()=>{

    const [inputs,setInputs]=useState({
        email:"",
        password:"",
    })

    const [showPassword,setShowPassword]=useState(false)
    const {login,loading,error}=useLogin()
    return(
        <>
        <Input 
        placeholder="Email"
        fontSize={14} type="email" outline={"none"} w={"full"} padding={2} borderRadius={"full"} value={inputs.email} onChange={(e)=>{setInputs({...inputs,email:e.target.value})}}/> 
       

       
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

      
<Button onClick={()=>{login(inputs)}}  w={"full"} h={"35px"}bg={"blue.500"} isLoading={loading} borderRadius={"full"} size={"sm"} fontSize={14}>
                Login
                </Button>


        </>

    )
}