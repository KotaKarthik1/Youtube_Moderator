import { useState } from "react";
import LoginPopup from "./LoginPopup";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import authApi from "../apis/auth.api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ isScrolled }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userType, setUserType] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUser);
  console.log(currentLoggedInUser);

  const navigate = useNavigate();
  const toggleDropdown = () => {
    menuOpen == true
      ? setShowDropdownMobile(!showDropdownMobile)
      : setShowDropdown(!showDropdown);
  };
  const toggleDropdownMobile = () => setShowDropdownMobile(!showDropdownMobile);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => setShowPopup(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const signUpBtn = () => {
    navigate("/signUp");
  };
  const handleLoginSelection = (type) => {
    setUserType(type);
    setShowDropdown(false);
    setShowDropdownMobile(false);
    setShowPopup(true);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    const logoutUser = (logoutFunction, successMessage) => {
      logoutFunction({
        success: () => {
          console.log(successMessage);
          setCurrentLoggedInUser(null);
          toast.success(successMessage, {
            position: "top-center",
            autoClose: 2000,
          });
          navigate("/");
        },
        error: () => {
          toast.error("Error in server", {
            position: "top-center",
            autoClose: 2000,
          });
        },
      });
    };

    if (currentLoggedInUser?.role === "editor") {
      logoutUser(authApi.handleEditorLogout, "Editor logged out");
    } else if (currentLoggedInUser?.role === "organizer") {
      logoutUser(authApi.handleOrgLogout, "Organizer logged out");
    } else {
      navigate("/");
    }

    setShowUserDropdown(false);
  };

  const handleProfileNavigation = () => {
    if (currentLoggedInUser?.role == "editor") {
      navigate("/auth/profile/editor");
    } else if (currentLoggedInUser?.role == "organizer") {
      navigate("/auth/profile/org");
    } else {
      navigate("/");
    }
  };
  const handleHomeNavigation = () => {
    if (currentLoggedInUser?.role === "editor") {
      navigate("/EditorDashboard");
    } else if (currentLoggedInUser?.role === "organizer") {
      navigate("/OrgDashboard");
    } else {
      navigate("/");
    }
  };
  const handleServicesNavigation = () => {
    navigate("/servicesNonAuth");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-10 w-full flex justify-between items-center text-white px-10 py-7 transition-colors duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-30 text-white"
            : "bg-transparent text-white"
        }`}
      >
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="SkillCircle Logo" className="w-10 h-auto" />
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex-grow flex justify-end">
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

        <div className="hidden md:flex flex-grow justify-end">
          <ul className="nav flex items-center space-x-5 pr-10">
            <li>
              <button
                className="font-bold hover:text-slate-600"
                onClick={handleHomeNavigation}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="font-bold hover:text-slate-600"
                onClick={handleServicesNavigation}
              >
                Services
              </button>
            </li>
            <li>
              <a
                href="/contactUsNonAuth"
                className="font-bold hover:text-slate-600 "
              >
                Contact
              </a>
            </li>
            <li>
              <a href="/FAQNonAuth" className="font-bold hover:text-slate-600 ">
                FAQ
              </a>
            </li>
            <li>
              {currentLoggedInUser?.role == "editor" && (
                <a href="/" className="font-bold hover:text-slate-600 ">
                  Organizers
                </a>
              )}
            </li>
          </ul>
        </div>


          <div className="flex items-center relative">
            <button
              onClick={toggleDropdown}
              className="bg-transparent hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full border-2 border-white hidden md:block"
            >
              Login
            </button>

            {showDropdown == true && (
              <>
                <div
                  className={`absolute top-16 right-0 bg-white rounded-lg shadow-lg p-2 z-20`}
                >
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
              </>
            )}
            {showDropdownMobile == true && (
              <>
                <div
                  id="login-popup"
                  tabIndex="-1"
                  className={`bg-black/50 fixed top-0 right-0 left-0 z-50 h-full flex items-center justify-center`}
                >
                  <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                      <button
                        type="button"
                        onClick={toggleDropdownMobile}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="#c6c7c7"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close popup</span>
                      </button>

                      <div className="p-5">
                        <div className="text-center">
                          <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                            Organizer
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                            Editor
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        
        {menuOpen && (
          <div
            className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-90 text-white shadow-lg md:hidden transform transition-transform duration-500 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ul className="flex flex-col items-center justify-center h-full space-y-6">
              <li>
                <a href="/" className="text-xl font-bold">
                  Home
                </a>
              </li>
              <li>
                <button
                  className="text-xl font-bold"
                  onClick={handleServicesNavigation}
                >
                  Services
                </button>
              </li>
              <li>
                <a href="/contactUsNonAuth" className="text-xl font-bold">
                  Contact
                </a>
              </li>
              <li>
                <a href="/FAQNonAuth" className="text-xl font-bold">
                  FAQ
                </a>
              </li>
                
                  <li
                    className="bg-transparent hover:bg-gray-700 text-white font-bold py-2 px-5 rounded border border-white"
                    onClick={signUpBtn}
                  >
                    Sign Up
                  </li>
                  <li
                    className="bg-transparent hover:bg-gray-700 text-white font-bold py-2 px-6 rounded border border-white"
                    onClick={toggleDropdown}
                  >
                    Log in
                  </li>
              
            </ul>
          </div>
        )}
      </header>
      <LoginPopup isOpen={showPopup} onClose={closePopup} userType={userType} />
    </>
  );
};

export default Header;
