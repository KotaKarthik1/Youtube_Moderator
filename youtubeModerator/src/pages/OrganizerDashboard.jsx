import React from 'react'
import authApi from "../apis/auth.api";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Components/Header';

export default function OrganizerDashboard() {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentUser);
  const navigate = useNavigate();
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
    <div className='mt-24'>
    <div>
      <h1> org dashboard is here</h1>
      <button onClick={handleCreateTask} className='bg-gray-400 text-white'>create task</button>
      <button onClick={handleOrgLogout}> logout </button>
    </div>
    </div>
  )
}
