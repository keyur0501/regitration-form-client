import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <>
      <header className=" bg-white shadow-md w-full">
        <div className="container mx-auto px-4  ">
          <div className="flex justify-between items-center py-4">
            <div className="logo flex w-22 h-16 ">
              <img src={logo} />
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
