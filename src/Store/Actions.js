
export const addCommentToPost=(data)=>{
    return{
        type:"ADD_COMMENT_TO_POST",
        data
    }
}

export const removePost=(data)=>{
    return{
        type:'REMOVE_POST',data
    }
}

export const addPost=(data)=>{
    return{
        type:'ADD_POST',
        data
    }

}

export const addPostToAuthUser=(data)=>{
    return{
        type:"ADD_POST_TO_AUTHUSER",
        data
    }
}

export const setPost=(data)=>{
    
    return{
        type:'SET_POST',
        data}
}





export const loginUser=(data)=>{

    return{
        data,
        type:'SET_USER',
    }

}

export const updateUser=(data)=>{
    return{
        type:'UPDATE_USER',
        data
    }
}


export const logoutUser=()=>{
    return {
        type:'REMOVE_USER'  }
    
}


export const setVisitingProfileUser=(data)=>{
    return{data,
        type:'SET_VISITING_PROFILE_USER'
    }
}


export const removeVisitingProfileUser=()=>{
    return {
        type:'REMOVE_VISITING_PROFILE_USER'
    }
}