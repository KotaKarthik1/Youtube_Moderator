import { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import currentUserState from "../store/user.store";
import { useRecoilState } from "recoil";
import authApi from "../apis/auth.api";
import Loader from "../Components/Loader/Loader";

export default function ProtectedOrgRouter() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);

    const checkOrgState = () => {
      console.log(currentLoggedInUser?._id);
       authApi.checkOrgStatus({
        success:(res)=>{
          console.log(res);
        
        const data=res?.data?.data;
        console.log("data is",data);
            setCurrentLoggedInUser({
              isLoggedIn:true,
              organizerRequestStatus:'',
              _id:data?._id,
              name:data?.name,
              email:data?.email,
              password: "",
              desc:"",
              profileImg:data?.profileImageUrl,
              role: "organizer",
              editorIds: data?.editorIds,
              organizer:'',
              assignedTasks: "",
              pendingEditors: data?.pendingEditors,
            })

            console.log("logged in org");
            
            // setCurrentLoggedInUser({isLoggedIn:true,data});
            console.log(currentLoggedInUser);
        },
        error:(err)=>{
          setCurrentLoggedInUser(null);
          console.log(err);
          navigate("/");
        },final: () => {
          setIsLoaded(true);
        },
      })
    };

  useEffect(() => {
    checkOrgState();
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
