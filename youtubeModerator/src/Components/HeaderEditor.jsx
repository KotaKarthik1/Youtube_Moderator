import { useState } from "react";
import LoginPopup from "./LoginPopup";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import authApi from "../apis/auth.api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderEditor = ({ isScrolled }) => {
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
      setShowUserDropdown(false);
    } else if (currentLoggedInUser?.role == "organizer") {
      navigate("/auth/profile/org");
    } else {
      navigate("/");
    }
  };
  const handleHomeNavigation = () => {
    if (currentLoggedInUser?.role === "editor") {
      navigate("/EditorDashboard");
    }
    else {
      navigate("/");
    }
  };
  const handleServicesNavigation = () => {
    if(currentLoggedInUser?.role==='editor')
      {
        navigate('/auth/features/editor');
      }
      else{
        navigate('/');
      }
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
                href="/auth/contact/editor"
                className="font-bold hover:text-slate-600 "
              >
                Contact
              </a>
            </li>
            <li>
              <a href="/auth/faq/editor" className="font-bold hover:text-slate-600 ">
                FAQ
              </a>
            </li>
            <li>
              {currentLoggedInUser?.role == "editor" && (
                <a href="/AllOrgnizers" className="font-bold hover:text-slate-600 ">
                  Organizers
                </a>
              )}
            </li>
          </ul>
        </div>

            <div className="max-w-md mx-auto">
              <div
                className={`relative p-0 flex items-center h-12 rounded-lg bg-transparent overflow-hidden ${
                  isExpanded ? "w-full" : "w-10"
                } md:w-full transition-all duration-300 ease-in-out`}
              >
              </div>
            </div>
            <div className="flex items-center relative">
              <button
                onClick={toggleUserDropdown}
                className="bg-transparent text-white font-bold rounded  relative"
              >
                <svg fill="none" viewBox="0 0 15 15" height="1.5em" width="2em">
                  <path
                    fill="currentColor"
                    d="M3 13v.5h1V13H3zm8 0v.5h1V13h-1zm-7 0v-.5H3v.5h1zm2.5-3h2V9h-2v1zm4.5 2.5v.5h1v-.5h-1zM8.5 10a2.5 2.5 0 012.5 2.5h1A3.5 3.5 0 008.5 9v1zM4 12.5A2.5 2.5 0 016.5 10V9A3.5 3.5 0 003 12.5h1zM7.5 3A2.5 2.5 0 005 5.5h1A1.5 1.5 0 017.5 4V3zM10 5.5A2.5 2.5 0 007.5 3v1A1.5 1.5 0 019 5.5h1zM7.5 8A2.5 2.5 0 0010 5.5H9A1.5 1.5 0 017.5 7v1zm0-1A1.5 1.5 0 016 5.5H5A2.5 2.5 0 007.5 8V7zm0 7A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0z"
                  />
                </svg>
              </button>

              {/* User dropdown */}
              {showUserDropdown && (
                <div className="absolute top-16 right-0 bg-white rounded-lg shadow-lg p-2 z-20">
                <div className="flex items-center w-full px-4 py-2 text-gray-700">
                  <span className="text-sm">{currentLoggedInUser.name}</span>
                </div>
                <button
                  onClick={handleProfileNavigation}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md"
                >
                  <span className="text-sm">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md"
                >
                  <span className="text-sm">Logout</span>
                </button>
              </div>
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
                <a href="/auth/faq/editor" className="text-xl font-bold">
                  FAQ
                </a>
              </li>
              <li>
                {currentLoggedInUser?.role == "editor" && (
                  <a
                    href="/AllOrgnizers"
                    className="font-bold hover:text-slate-600 "
                  >
                    Organizers
                  </a>
                )}
              </li>

              {/* </ul> */}

              
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderEditor;
