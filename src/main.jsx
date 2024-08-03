import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { extendBaseTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { reduxStore } from './Store/store.js'

import { Provider, } from 'react-redux'




const styles={
  global:(props)=>({
    body:{
      bg:mode("gray.100","#000")(props),
      color:mode("gray.800","whiteAlpha.900")(props)
    }
  })
}

const config={
  initialColorMode:"dark",
  useSystemColorMode:true,

}

const theme=extendBaseTheme({
  config,styles

})








ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={reduxStore}>
  
  <ChakraProvider theme={theme}>
  <BrowserRouter>
      <App/>
    
      </BrowserRouter>
    </ChakraProvider>
    
    </Provider>
  

)



