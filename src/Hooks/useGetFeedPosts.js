import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react"
import { useSelector } from "react-redux";
import { firestore } from "../Firebase/Firebase";

export function useGetFeedPosts(){

    const [isLoading,setIsLoading]=useState(true);
    const authUser=useSelector(state=>state.User)
    const[posts,setPosts]=useState()
    


    const getFeedPosts=async()=>{
        if(authUser?.following?.length === 0 || !authUser) {
            console.log('request denied')
            setIsLoading(false);
            setPosts([])
            return;
        }
        const q=query(collection(firestore,'posts'),where("createdBy","in",authUser?.following))
        
        try {
            const querySnapshot=await getDocs(q)
            
            const feedPosts=[];
            querySnapshot.forEach(doc=>{
                
                feedPosts.push({id:doc.id,...doc.data()})
            }
            )
            
            feedPosts.sort((a,b)=>b.createdAt - a.createdAt)
            setPosts(feedPosts)
            
            
        } catch (error) {
            console.log(error.message)
            
        }
        setIsLoading(false)
    }



    return{getFeedPosts,posts,isLoading}
}