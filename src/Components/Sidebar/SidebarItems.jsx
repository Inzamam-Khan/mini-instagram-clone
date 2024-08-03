import { Flex ,Box,Link,Image,Avatar,Tooltip,Button} from "@chakra-ui/react"
import {Link as RouterLink} from 'react-router-dom'
import { BiHomeAlt2, BiLogOut, BiSearchAlt2 } from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import userLogo from '../../assets/userLogo.png'
import Instagram_Logo_wine from "../../assets/Instagram-Logo.wine.svg"
import Instagram_Wordmark_Logo_wine from '../../assets/Instagram_Wordmark_Logo_wine.svg'
import { useLogout } from "../../Hooks/useLogout";
import { useSelector } from "react-redux";



export const SidebarItems=({showSideBar,setShowSideBar})=>{

    
    const user=useSelector(state=>state.User)
    

    const visitingProfileUser=useSelector(state=>state.visitingProfileUser)

    
    const sidebarItems=[
        {
            icon:<BiHomeAlt2 size={25} fill="#00D2FC"/>,
            
            text:"Home",
            link:'/'
        },
        { icon:<BiSearchAlt2 size={25}  fill="#00D2FC"/>,
        
        text:"Search",
        link:'/search'

        },
        {
            icon:<FaRegHeart size={25} fill="#00D2FC"/>,
            text:"Notifications"
        },
        {
            icon:<MdOutlineAddToPhotos size={25}  fill="#00D2FC"/>,
            
            text:'Create Post',
            link:'/createpost'

        },
        
        {
            icon:<Avatar w={'1.7em'} h={'1.7em'} name={user.fullName} border={"1px solid #00D2FC"} src={user.profilePicURL || ""}/>,
            text:"Profile",
            link:`${user.userName}`
        }
    ]

    const {handleLogout,isLoggingOut,error}=useLogout()
    return(

        <Box height={"100vH"} py={8}  position={"fixed"} display={{base:"block",md:""}} 
       left={0} top={0} px={{base:2,md:8}}  >

        <Flex direction={"column"} gap={8} w={"full"} pr={5}  height={"full"}  borderRight={'1px solid '} borderColor={'gray.900'}>  
            {/* mobile logo */}
            {/* <Link to={"/"} as={RouterLink} p={2}
            borderRadius={10} _hover={{bg:"whiteAlpha.400"}} w={{base:10}} display={{base:"",md:'none'}} cursor={"pointer"}>
           
                <Image src={Instagram_Logo_wine} />
            </Link> */}
            
                {/* desktop version logo */}
            <Link to={"/"} as={RouterLink} pl={2} display={{base:"none",md:'block'}} cursor={"pointer"}>
           
                <Image src={Instagram_Wordmark_Logo_wine} w={"8rem"} />
            </Link>


            {/* mid section */}
            <Flex direction={"column"} gap={4}cursor={"pointer"} > 

                     <Link to={"/"} as={RouterLink} p={2}
            borderRadius={10} _hover={{bg:"whiteAlpha.400"}} w={{base:10}} display={{base:"block",md:'none'}} cursor={"pointer"}>
           
                <Image src={Instagram_Logo_wine}   />
            </Link> 
            {
                    sidebarItems.map((item,index,)=> (
                        <Tooltip key={index} hasArrow  label={item.text} placement={"right"}  openDelay={200} display={{base:"block", md:'none'}} >
                                
                        <Link as={RouterLink} to = {item.link || ''} display={'flex'} onClick={()=>{setShowSideBar(false)}} alignItems={"center"} _hover={{bg:'whiteAlpha.200' }} borderRadius={6} justifyContent={{base:'center',md:'start'}}
                        gap={3}   p={2} w={{base:10,md:'full'}} >
                            
                            
                            
                            {item.icon}


                            <Box display={{base:'none',md:'block'}}>
                                {item.text}

                            </Box>
                        </Link>

                        </Tooltip>

                    ))
                }

            </Flex>

            {/* logout button */}

            

            <Flex  direction={"column"}  cursor={'pointer'} mt={{base:'10.4em',sm:'auto'}} > 

                    <Tooltip hasArrow label={"Logout"} placement="right" openDelay={300} display={{base:'block' , md:'none'}}>
                       {/*  */}
                        <Flex onClick={handleLogout} alignItems={'center'} borderRadius={6}
                         justifyContent={{base:'center',md:'start'}} _hover={{bg:'whiteAlpha.200'}} 
                        gap={3} pl={1.5} w={{base:10,md:'full'}} >
                            
                            <BiLogOut size={23} fill={'#d00000'} />

                            <Button isLoading={isLoggingOut} display={{base:'none',md:'block'}}>
                                {"Logout"}

                            </Button>

                        </Flex>

                    </Tooltip>

            </Flex>



            
          

        </Flex>

       </Box>
    )
}