import './App.css'
import Login from './Components/Login'
import Blogs from "./Components/Blogs"
import AddBlog from "./Components/AddBlog"
// import Navbar from "./Components/Navbar"
import SingleBlog from "./Components/SingleBlog"

import { BrowserRouter,Route,Routes } from 'react-router-dom'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/blogs/:id' element={<SingleBlog/>} />
        <Route path='/addblogs' element={<AddBlog/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
