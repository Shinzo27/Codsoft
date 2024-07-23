import React, { useContext, useState } from "react";
import Button from "./Shared/Button";
import { TiThMenuOutline } from "react-icons/ti";
import { Context } from '../main'
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { isAuthenticated, user } = useContext(Context)

  const Navbar = [
    isAuthenticated ?
    {
      id:1,
      title: user.name,
      link: "/profile"
    } : {
      id:1,
      title: "Login",
      link: "/signin"
    }
  ]
  const handleLogout = async() => {

  }
  
  return (
    <div>
      <div className="w-full h-16 bg-black text-white font-bold flex justify-around items-center px-4">
        <div className="md:text-2xl text-xl">Project Management Tool</div>
        <div className="sm:flex hidden gap-4">
            <div className="flex items-center justify-center gap-4">
              { 
                isAuthenticated ? (
                  <div className="flex items-center justify-center gap-4">
                    <Link type="button" className="p-2 rounded-lg bg-white text-black">{ user.name }</Link>
                    <Link type="button" className="p-2 rounded-lg bg-white text-black" onClick={handleLogout}>Logout</Link>
                  </div>
                ) : (
                  <Link type="button" className="p-2 rounded-lg bg-white text-black">Login</Link>
                )
              }
              
            </div>
        </div>
        <div className="text-2xl sm:hidden">
          <TiThMenuOutline onClick={toggleMenu} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute py-6 top-16 left-0 w-full bg-black text-white flex flex-col items-center sm:hidden">
          <Button title="Login" bgColor="White" fontColor="Black" />
          <div className="py-4">
            <h2 className="pb-3">My name</h2>
          </div>
          <Button title="Logout" bgColor="White" fontColor="Black" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
