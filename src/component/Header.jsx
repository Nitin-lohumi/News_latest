import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Header = ({
  user,
  setDashbord,
  setPayoutDetails,
  setNewsAnalytic,
  setExportOptions,
  NewsAnalytics,
  PayoutDetails,
  Dashboard,
  ExportOptions,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNews = () => {
    setDashbord(false);
    setPayoutDetails(false);
    setNewsAnalytic(true);
    setExportOptions(false);
    closeMenu();
  };

  const handlePayout = () => {
    setDashbord(false);
    setPayoutDetails(true);
    setNewsAnalytic(false);
    setExportOptions(false);
    closeMenu();
  };

  const handleDashbord = () => {
    setDashbord(true);
    setPayoutDetails(false);
    setNewsAnalytic(false);
    setExportOptions(false);
    closeMenu();
  };

  const handleOptions = () => {
    setDashbord(false);
    setPayoutDetails(false);
    setNewsAnalytic(false);
    setExportOptions(true);
    closeMenu();
  };

  return (
    <header className="bg-blue-700 text-white py-4 px-2 flex justify-between items-center z-30 fixed top-0 left-0 w-full dark:bg-black">
      <div className="text-2xl font-bold flex items-center gap-2">
        <img
          src={user.photoURL !== "" ? user.photoURL : "https://via.placeholder.com/400"}
          alt="User"
          className="rounded-full w-12"
        />
        <h1 className="hidden sm:block dark:text-green-600">
          Welcome {user.displayName}
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="space-x-4 hidden sm:flex">
        <button
          onClick={toggleDarkMode}
          className="bg-blue-400 text-white py-2 px-4 rounded dark:bg-gray-800"
        >
          {isDarkMode ? <CiLight size={24} /> : <MdDarkMode size={24} />}
        </button>
        <Link
          to="/"
          className="hover:underline"
          style={{ borderBottom: Dashboard ? "1px solid white" : "" }}
          onClick={handleDashbord}
        >
          Dashboard
        </Link>
        <Link
          to="/NewsAnalytics"
          className="hover:underline"
          style={{ borderBottom: NewsAnalytics ? "1px solid white" : "" }}
          onClick={handleNews}
        >
          News Analytics
        </Link>
        <Link
          to="/PayoutDetails"
          className="hover:underline"
          style={{ borderBottom: PayoutDetails ? "1px solid white" : "" }}
          onClick={handlePayout}
        >
          Payout Details
        </Link>
        <Link
          to="/ExportOptions"
          className="hover:underline"
          style={{ borderBottom: ExportOptions ? "1px solid white" : "" }}
          onClick={handleOptions}
        >
          Export Options
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
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
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-blue-700 text-white p-4 rounded-lg shadow-lg dark:bg-black">
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={toggleDarkMode}
                className="bg-blue-400 text-white py-2 px-4 rounded dark:bg-gray-800"
              >
                {isDarkMode ? <CiLight size={24} /> : <MdDarkMode size={24} />}
              </button>
            </div>
            <Link
              to="/"
              className="block hover:underline dark:border dark:p-2 rounded-lg"
              onClick={handleDashbord}
            >
              Dashboard
            </Link>
            <Link
              to="/NewsAnalytics"
              className="block hover:underline dark:border dark:p-2 rounded-lg"
              onClick={handleNews}
            >
              News Analytics
            </Link>
            <Link
              to="/PayoutDetails"
              className="block hover:underline dark:border dark:p-2 rounded-lg"
              onClick={handlePayout}
            >
              Payout Details
            </Link>
            <Link
              to="/ExportOptions"
              className="block hover:underline dark:border dark:p-2 rounded-lg"
              onClick={handleOptions}
            >
              Export Options
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600"
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
