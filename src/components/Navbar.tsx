import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import travaioLogo from "../assets/travaio_logo.png";
import { useAuth } from "../hooks/AuthProvider";

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full">
            <img
              src={travaioLogo}
              alt="Travaio Logo"
              className="h-[160px] w-auto object-contain dark:brightness-110"
            />
          </Link>

          {/* Nav + Auth Wrapper */}
          <div className="flex items-center justify-end flex-1">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex gap-6 text-base font-medium text-gray-700 dark:text-gray-300 mr-6">
              <Link
                to="/"
                className="hover:text-blue-600 dark:hover:text-white transition"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="hover:text-blue-600 dark:hover:text-white transition"
              >
                Search
              </Link>
              <Link
                to="/explore"
                className="hover:text-blue-600 dark:hover:text-white transition"
              >
                Explore
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-600 dark:hover:text-white transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-600 dark:hover:text-white transition"
              >
                Contact
              </Link>
            </nav>

            {/* User Icon (Desktop) */}
            <div className="hidden md:flex items-center">
              <Link
                to={currentUser ? "/profile" : "/login"}
                className="text-white bg-blue-600 hover:bg-blue-700 w-9 h-9 flex items-center justify-center rounded-full transition"
              >
                <FaUser size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white text-2xl"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-4 shadow-md text-right">
          <button
            onClick={() => handleNavClick("/")}
            className="block w-full text-base font-medium text-right text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("/search")}
            className="block w-full text-base font-medium text-right text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
          >
            Search
          </button>
          <button
            onClick={() => handleNavClick("/explore")}
            className="block w-full text-base font-medium text-right text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
          >
            Explore
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            className="block w-full text-base font-medium text-right text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("/contact")}
            className="block w-full text-base font-medium text-right text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick(currentUser ? "/profile" : "/login")}
            className="inline-block text-base font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full"
          >
            {currentUser ? "Account" : "Sign In"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
