import authApi from "../apis/auth.api";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";
import EditorEdits from "../Components/EditorEdits";
import Footer from "../Components/Footer";
import HeaderEditor from "../Components/HeaderEditor";
export default function EditorDashboard() {
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUser);
  const navigate = useNavigate();
  
  return (
    <>
      <HeaderEditor isScrolled={50} />
      <div className="bg-slate-800 mb-5">
        <div className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
          
            <div className="p-20 sm:p-14 md:p-14 lg:p-24 xl:p-20 w-auto px-2 sm:px-4 md:px-14 lg:px-24 xl:px-24 relative text-gray-300">
              <p className="text-6xl py-4 flex justify-center">Tasks</p>
              <EditorEdits />

              {/* <h1>editor dashboard is here</h1> */}

              {/* <button onClick={handleLogoutEditor}>logout </button> */}
            </div>
          
        </div>
      </div>
      <Footer/>
    </>
  );
}
