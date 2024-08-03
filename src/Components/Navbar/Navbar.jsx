import { Button, Container,Flex,Image ,Link} from "@chakra-ui/react"
import { Link   as RouterLink} from "react-router-dom"
import Instagram_Wordmark_Logo_wine from '../../assets/Instagram_Wordmark_Logo_wine.svg'
import Instagram_Logo_wine from "../../assets/Instagram-Logo.wine.svg"
export const Navbar=()=>{
    return(
        

        <Container maxW={'container.xl'} >

            <Flex w={{base:'sm',sm:'full'}} align={'center'} justify={{base:'space-between',sm:'space-around'}} mt={{base:8,md:0}}>

                    {/* mobile version logo */}

                    
                            <Link to={'/'} as={RouterLink}   >
                            <Image src={Instagram_Logo_wine} alt={'logo'} w={'6'} ml={4}  display={{base:'block',sm:'none'}}/>        
                            
                    
                    
               

                {/* desktop version logo */}
                <Image src={Instagram_Wordmark_Logo_wine}  w={'9em'} display={{base:'none',sm:"block"}} cursor={"pointer"}/> 
                </Link>

                <Flex gap={4}> 
                    <Link to={'/'} as={RouterLink}>
                    <Button color={'#b5179e'} _hover={{color:'wheat'}} size={'sm'}>Login</Button>
                    </Link>

                    <Link to={'/'} as={RouterLink}>
                    <Button size={'sm'} color={'#b5179e'}  _hover={{color:'wheat'}}>
                        Signup
                    </Button>
                    </Link>
                </Flex>

            </Flex>





        </Container>
        
        
        
        
        
    )
}