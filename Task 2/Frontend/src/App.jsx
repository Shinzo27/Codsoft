import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import Hero from "./Pages/Hero"
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react"
import { Context } from "../../../Task 1/Frontend/src/main"

function App() {
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context)

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<Hero/>} path="/"/>
          <Route element={<Signup/>} path="/signup"/>
          <Route element={<Signin/>} path="/signin"/>
        </Routes>
       <Footer/>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
    </>
  )
}

export default App
