import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const nqavigate = useNavigate()

  const logout = ()=> {
    nqavigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <nav className="flex justify-between items-center px-6 sm:px-10 py-4 border-b bg-white/10 backdrop-blur-md shadow-md">
      {/* Left Section - Logo & Role */}
      <div className="flex items-center gap-4">
        <img src={assets.admin_logo} alt="Admin Logo" className="h-10 sm:h-12" />
        <p className="text-lg sm:text-xl font-semibold text-gray-900">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Right Section - Logout Button */}
      <button onClick={logout} className="px-5 py-2 text-white bg-[#6C63FF] rounded-lg hover:bg-[#5149e6] hover:scale-105 transition-all shadow-md">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
