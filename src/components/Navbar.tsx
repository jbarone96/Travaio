import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import travaioLogo from "../assets/travaio_logo.png";
import { useAuth } from "../hooks/AuthProvider";

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();

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
            {/* Nav Links */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300 mr-6">
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

            {/* User Icon Button */}
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
            <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white">
              {/* Mobile menu icon */}☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
