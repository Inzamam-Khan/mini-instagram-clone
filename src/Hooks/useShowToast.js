import { useToast } from '@chakra-ui/react'
export const useShowToast=()=>{


    const toast=useToast()

    const showToast=(title,description,status)=>{
        
        console.log(title,"-----",description,status)

        toast({
            
            title,
            description,
            status,
            duration:1000,
            isClosable:true

        }

        )


    }

    return showToast;
}