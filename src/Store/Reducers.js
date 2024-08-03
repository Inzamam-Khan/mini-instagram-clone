

import { combineReducers } from "redux";



function userPost(state=[],payload){

    const {type,data}=payload
    
    // const {comment,postId}=data
    

    

    switch(type)
    {

        case "ADD_POST":
            {
            return [...state,data]
        }

        case "SET_POST":
            {
            return state=data;
        }

        case "REMOVE_POST":
            {
                let oldState=state;
                const newState=oldState.filter((item)=> item.id !== data);
                
                return newState;
            }

            case "ADD_COMMENT_TO_POST":{



                const oldState=state;
               const newState= oldState.map((obj)=>{
                    if(obj.id=== data.postId) {
                        return {
                            ...obj,comments:[...obj.comments,data.newComment]
                        }

                    }
                    return obj

                })
                return newState

                            }

            default:
                {
                    return state;
                }
    }

    
}





function visitingProfileUser(state=[],payload){
        const{type,data}=payload;

        switch(type){
            case 'SET_VISITING_PROFILE_USER':{
                return state=data;
            }
            case 'REMOVE_VISITING_PROFILE_USER':{
                return state=[]
            }
            default:{
                return state;
            }
        }

}




function User(state=JSON.parse(localStorage.getItem('user-info')) || '',payload){
    const {data,type}=payload;
    // authUser is an object
    
    
    switch(type)
    {
        case 'SET_USER':
            {
                return state=data
            }

        case 'UPDATE_USER':

            {
                

                const newState={...state,posts:state.posts.filter(i=>i !== data)}
                localStorage.setItem('user-info',JSON.stringify(newState))
                return newState;
            
                
            }

            case "ADD_POST_TO_AUTHUSER":{
                const oldState=state
                        const newState={...oldState,posts:[...oldState.posts,data]}
                        localStorage.setItem('user-info',JSON.stringify(newState))
                        return newState;

            }

        case 'REMOVE_USER':{
            return state=null
        }

        default:{
            return state;
        }
    }




}






export const allReducers=combineReducers({
    User,
    visitingProfileUser,
    userPost

})