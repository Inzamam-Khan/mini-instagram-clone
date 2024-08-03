import { Box, Container, Flex, Image, VStack, position } from "@chakra-ui/react"
import instalogo from '../../assets/instaLogo.png'
import microsoftLogo from '../../assets/512px-Get_it_from_Microsoft_Badge.png';
import playStoreLogo from '../../assets/playStoreLogo.svg'
import { AuthForm } from "../../Components/AuthForm/AuthForm";
export const AuthPage=()=>{
    return(

        <Flex minH={"100vh"} justifyContent={"center"} px={4}>

            <Container maxW={"container.md"} padding={0}  alignItems={"center"}  >


                <Flex gap={10} justifyContent={'center'} align={"center"}>

                    
                {/* left side */}
                <Box display={{base:'none',md:'block',}}>
                    <Image src={instalogo} h={200} w={200} alt='logo'/>
                </Box>



                {/* right side */}
                <VStack spacing={2} align={"stretch"} style={{position:"relative" ,top:"80px"}}>
                    <AuthForm />
                    <Box textAlign={"center"}>Get the App</Box>
                    <Flex gap={3} justifyContent={"center"} align={"center"} style={{position:"relative",top:"-32px"}}>
                        <Image src={playStoreLogo} h={20} cursor={'pointer'}/>
                        <Image src={microsoftLogo} h={7} cursor={'pointer'}/>
                    </Flex>
                </VStack>





                </Flex>




            </Container>

        </Flex>
    );
}