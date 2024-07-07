import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import About from './Pages/About'
import Signup from './Pages/Signup'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { Context } from './main'

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser} = useContext(Context)
  
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      <Footer/>
      <ToastContainer position='top-center'/>
    </BrowserRouter>
  )
}

export default App
