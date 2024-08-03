import { Routes,Route,Navigate } from "react-router-dom"
import { Homepage } from "./pages/HomePage/Homepage"
import { AuthPage } from "./pages/AuthPage/Authpage"
import { PageLayout } from "./Layouts/PageLayouts/PageLayouts"
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"
import { useSelector } from "react-redux"
import { useState } from "react"
import { SearchPage } from "./pages/SearchPage/SearchPage"
import { CreatePost } from "./pages/CreatePost/CreatePost"

function App() {
 
  const user=useSelector(state=>state.User)
  

  return (
    <PageLayout>
    <Routes>
      <Route path="/" element={ user ? <Homepage/> : <Navigate to="/auth"/> }/>
      <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>}/>
      <Route path="/:userName" element={<ProfilePage/>}/>
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/createpost" element={<CreatePost/>}/>
    </Routes>
    
    </PageLayout>


   
  )
}

export default App










