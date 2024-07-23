import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  
import { Context } from '../../../Task 1/Frontend/src/main.jsx'

export const context = createContext({isAuthenticated: false})

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(false)

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser}}>
      <App/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
