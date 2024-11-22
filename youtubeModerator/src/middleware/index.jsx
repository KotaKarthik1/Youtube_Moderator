import { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import currentUserState from "../store/user.store";
import { useRecoilState } from "recoil";
import authApi from "../apis/auth.api";
import Loader from "../Components/Loader/Loader";

export default function ProtectedRouter() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);

    const checkUserState = () => {
       authApi.checkUserStatus({
        success:(res)=>{
          console.log("role is ",res.data.user?.role);
          console.log("response from index.js ",res.data.user);
  
         
            const data=res?.data?.user;
            console.log("data from index.js",data);
            // console.log("")
            setCurrentLoggedInUser({
              isLoggedIn:true,
              organizerRequestStatus:data?.organizerRequestStatus,
              _id:data?._id,
              name:data?.name,
              email:data?.email,
              password: data?.password,
              profileImg:data?.profileImageUrl,
              desc:data?.description,
              role: data?.role,
              editorIds: data?.editorIds,
              organizer:data?.organizerName,
              assignedTasks: data?.assignedTasks,
              pendingEditors: data?.pendingEditors,
            });
        },
        error:(err)=>{
          setCurrentLoggedInUser(null);
          navigate("/");
        },final: () => {
          setIsLoaded(true);
        },
      })
    };

  useEffect(() => {
    checkUserState();
  }, [navigate]);

  return (
    <>
      {isLoaded ? (
        currentLoggedInUser?.isLoggedIn ? (

          <Outlet />
          
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
