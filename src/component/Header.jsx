import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to control the mobile menu
  const navigate = useNavigate();
  const [Dashboard,setDashbord]= useState(true);
  const [NewsAnalytics,setNewsAnalytic]= useState(false);
  const [PayoutDetails,setPayoutDetails]= useState(false);
  const [ExportOptions,setExportOptions]= useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  function handleNews(){
    setDashbord(false);
    setPayoutDetails(false);
    setNewsAnalytic(true);
    setExportOptions(false);
  }
  function handlepayout(){
    setDashbord(false);
    setPayoutDetails(true);
    setNewsAnalytic(false);
    setExportOptions(false);
  }
  function handleOptions(){
    setDashbord(false);
    setPayoutDetails(false);
    setNewsAnalytic(false);
    setExportOptions(true);
  }
  return (
    <header className="bg-blue-700 text-white py-4 px-2 flex justify-between items-center z-30 fixed top-0 left-0 w-full">
      <div className="text-2xl font-bold flex items-center gap-2">
        <img src={user.photoURL} alt="User" className="rounded-full w-12" />
        <h1 className="hidden sm:block">DASHBOARD</h1> {/* Hide on mobile */}
      </div>
      {/* Desktop Navigation */}
      <nav className="space-x-4 hidden sm:flex"> {/* Hide on mobile, show on sm and above */}
        <Link to="/NewsAnalytics" className="hover:underline" style={{border:NewsAnalytics?"1px solid  white":""}}
         onClick={handleNews}>
          News Analytics
        </Link>
        <Link to="/PayoutDetails" className="hover:underline"  style={{border:PayoutDetails?"1px solid  white":""}}
         onClick={handlepayout}>
          Payout Details
        </Link>
        <Link to="/ExportOptions" className="hover:underline"  style={{border:ExportOptions?"1px solid  white":""}} 
        onClick={handleOptions}>
          Export Options
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={toggleMenu} // Toggle menu on click
          className="text-white"
        >
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-blue-700 text-white p-4 rounded-lg shadow-lg">
          <div className="space-y-4">
            <Link
              to="/NewsAnalytics"
              className="block hover:underline"
              onClick={closeMenu} 
            >
              News Analytics
            </Link>
            <Link
              to="/PayoutDetails"
              className="block hover:underline"
              onClick={closeMenu} 
            >
              Payout Details
            </Link>
            <Link
              to="/ExportOptions"
              className="block hover:underline"
              onClick={closeMenu} 
            >
              Export Options
            </Link>
            <button
              onClick={handleLogout}
              className="block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
