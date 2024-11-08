import { useState } from "react";
import LoginPopup from "./LoginPopup";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
const Header = ({ isScrolled }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUserType] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => setShowPopup(false);

  const signUpBtn = () => {
    navigate("/signUp");
  };
  const handleLoginSelection = (type) => {
    setUserType(type);
    setShowDropdown(false);
    setShowPopup(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-10 w-full flex justify-between  text-white px-10 py-7 transition-colors duration-300 ${
          isScrolled ? "bg-black text-white" : "bg-transparent text-white"
        }`}
      >
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="SkillCircle Logo" className="w-10 h-auto" />
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex">
          <ul className="nav flex items-end ">
            <li className="mx-4">
              <a href="/" className="font-bold">
                Home
              </a>
            </li>
            <li className="mx-4">
              <a href="#services" className="font-bold">
                Services
              </a>
            </li>
            <li className="mx-4">
              <a href="#contact" className="font-bold">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center relative">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 hidden md:block"
            onClick={signUpBtn}
          >
            Sign Up
          </button>
          <button
            onClick={toggleDropdown}
            className="bg-transparent hover:bg-black text-white font-bold py-2 px-4 rounded border border-white relative hidden md:block"
          >
            Login
          </button>

          {showDropdown && (
            <div className="absolute top-16 right-0 bg-white rounded-lg shadow-lg p-2 z-20">
              <button
                onClick={() => handleLoginSelection("Organizer")}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md"
              >
                <span className="text-sm">Organizer</span>
              </button>
              <button
                onClick={() => handleLoginSelection("Editor")}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md"
              >
                <span className="text-sm">Editor</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black text-white shadow-lg md:hidden">
            <ul className="flex flex-col p-4">
              <li className="py-2">
                <a href="#" className="block font-bold">
                  Home
                </a>
              </li>
              <li className="py-2">
                <a href="#services" className="block font-bold">
                  Services
                </a>
              </li>
              <li className="py-2">
                <a href="#contact" className="block font-bold">
                  Contact
                </a>
              </li>
            </ul>
            <div className="flex flex-col p-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                Sign Up
              </button>
              <button
                onClick={toggleDropdown}
                className="bg-transparent hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-white"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>
      <LoginPopup isOpen={showPopup} onClose={closePopup} userType={userType} />
    </>
  );
};

export default Header;
