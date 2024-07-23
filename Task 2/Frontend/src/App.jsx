import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import Hero from "./Pages/Hero"
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react"
import { Context } from "./main"
import axios from "axios"

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context)

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        console.log(error);
      }
    };
    fetchUser()
  }, [isAuthenticated])
  
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
