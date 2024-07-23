import React, { useContext, useState } from "react";
import Button from "./Shared/Button";
import { TiThMenuOutline } from "react-icons/ti";
import { Context } from "../main";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="w-full h-16 bg-black text-white font-bold flex justify-around items-center px-4">
        <div className="md:text-2xl text-xl">Project Management Tool</div>
        <div className="sm:flex hidden gap-4">
          {isAuthenticated ? (
            <div>
              <Button title="Login" bgColor="White" fontColor="Black" />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <h2>My name</h2>
              </div>
              <div>
                <Button title="Logout" bgColor="White" fontColor="Black" />
              </div>
            </div>
          )}
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
