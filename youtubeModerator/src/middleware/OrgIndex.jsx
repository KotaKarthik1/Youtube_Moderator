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
       authApi.checkOrgStatus({
        success:(res)=>{
        //   console.log("role is ",res.data.user?.role);
        
        const data=res?.data;
            setCurrentLoggedInUser({
              isLoggedIn:true,
              organizerRequestStatus:data?.organizerRequestStatus,
              _id:data?._id,
              name:`${data?.name?.familyName} ${data?.name?.givenName}`,
              email:data?.email,
              password: data?.password,
              desc:data?.desc,
              profileImg:data?.photos[0]?.value,
              role: "organizer",
              editorIds: data?.editorIds,
              organizer:'',
              assignedTasks: data?.assignedTasks,
              pendingEditors: data?.pendingEditors,
            })

            console.log("logged in org");
            
            // setCurrentLoggedInUser({isLoggedIn:true,data});
            console.log(currentLoggedInUser);
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
