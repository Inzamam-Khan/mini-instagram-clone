import { Grid } from "@chakra-ui/react"
import { ProfilePost } from "./ProfilePost"
import gradientlakescenery from '../../assets/gradient-lake-scenery_23-2149151146.avif'
import beautiful_gradient_spring_landscape from '../../assets/beautiful-gradient-spring-landscape.avif'
import { useGetUserPosts } from "../../Hooks/useGetUserPosts"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const ProfilePosts=({user})=>{
    

    
    const {getUserPosts,postsState}=useGetUserPosts()
    

    useEffect(()=>{getUserPosts()},[user])
    
    
    return (
        <Grid  templateColumns={{sm:'repeat(1,1fr)',md:"repeat(5,1fr)"}}
         gap={4} columnGap={4} >

 
              {postsState.map((item,index)=>
              

<ProfilePost  key={index} item={item}/>

              
               
              

                 
                  )}

 
 






        </Grid>
    )
}