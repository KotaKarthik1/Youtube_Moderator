import React, { useEffect } from 'react'
import authApi from "../apis/auth.api";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Components/Header';
import { useSearchParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import OrgTasks from './OrgTasks';
import OrgAllTasks from '../Components/OrgAllTasks';
export default function OrganizerDashboard() {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentUser);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Extract userId from query parameters
    const userId = searchParams.get("userId");
    if (userId) {
      // Update the Recoil state with the user ID
      setCurrentLoggedInUser((prevState) => ({
        ...prevState,
        isLoggedIn: true,
        _id: userId,
      }));
      console.log("User ID stored in Recoil:", userId);
    }
  }, [searchParams, setCurrentLoggedInUser]);


  const handleCreateTask=()=>{

  }

  const handleOrgLogout = () => {
    authApi.handleOrgLogout({
      success:(res)=>{
        console.log("Organizer logged out");
        setCurrentLoggedInUser(null);
        toast.success("Organizer logged out",{
          position:"top-center",
          autoClose:"2000"
        });
        navigate('/');
        
      },
      error:(err)=>{
        toast.error("Error in server",{
          position:"top-center",
          autoClose:"2000"
        })
      }
    })
  };

  
  return (
    <>
      <div className="bg-slate-800 mb-5">
        <div className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
          
            <div className="p-20 sm:p-14 md:p-14 lg:p-24 xl:p-20 w-auto px-2 sm:px-4 md:px-14 lg:px-24 xl:px-24 relative text-gray-300">
              <a onClick={handleCreateTask} className="mb-6 cursor-pointer text-xl justify-center max-w boxBtn flex bg-slate-50 text-black hover:bg-transparent border-4 border-white rounded-full px-6 py-3 hover:text-white transition-all duration-500">Create Task</a>
              {/* <button onClick={handleCreateTask} className=' flex bg-gray-400 text-white justify-center'>create task</button> */}
              <OrgAllTasks />

              {/* <h1>editor dashboard is here</h1> */}

              {/* <button onClick={handleLogoutEditor}>logout </button> */}
            </div>
          
        </div>
      </div>
      <Footer/>
    </>
  )
}
