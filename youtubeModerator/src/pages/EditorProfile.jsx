import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import Footer from "../Components/Footer";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import editorApi from "../apis/editor.api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderEditor from "../Components/HeaderEditor";
export default function EditorProfile() {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentUser);
  const [profileData, setProfileData] = useState({
    profilePic: currentLoggedInUser?.profileImg,
    name: currentLoggedInUser?.name,
    edits: 0,
    organizer: currentLoggedInUser?.organizer,
    desc:currentLoggedInUser?.desc,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newText, setNewText] = useState(profileData.desc);
  const [preview,setPreview]=useState();
  // Fetch profile data on component mount
  // useEffect(() => {
  //   async function fetchProfileData() {
  //     try {
  //       const response = await axios.get("/api/profile");
  //       setProfileData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching profile data", error);
  //     }
  //   }
  //   fetchProfileData();
  // }, []);
  useEffect(()=>
  {
    async function fetchNoOfEdits()
    {
      console.log("count triggered");
      editorApi.handleTaskCount({
        success:(res)=>{
          setProfileData({ ...profileData, profilePic: response.data.imageUrl });
          setProfileData((prevData) => ({ ...prevData, edits: res.data.count }));
          console.log("response of count is ",res);
        },
        error:(err)=>{
          console.log("Error updating profile picture",err);
          // toast.error("Error fetching count of edits");
        }
      })
    }
    fetchNoOfEdits();
  },[])

  // Update profile picture
  const handleProfilePicChange = (e) => {
    if(e.target.files[0]){
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
    setNewProfilePic(e.target.files[0]);
  };

  const handleProfilePicUpload = async () => {

    const formData = new FormData();
    formData.append("profilePic", newProfilePic);
    console.log("file is",newProfilePic);
    editorApi.handleImageChange({
      payload:formData,
      success:(res)=>{
        setProfileData({ ...profileData, profilePic: res.data.imageUrl });
        setPreview(false);
        toast.success("Profile Image updated successfully");
      },
      error:(err)=>{
        console.log("Error updating profile picture",err);
        toast.error("Error Updating Profile Image");
      }
    })
  };

  // Update editor desc
  const handleTextChange = async () => {
    editorApi.handleTextChange(
      {
        payload:{
         newText
        },
        success:(res)=>{
          setProfileData({ ...profileData, desc: newText });
          setIsEditing(false);
          console.log("done text change");
          toast.success("Description updated successfully");
        },
        error:(err)=>{
          console.error("Error updating profile text", error);
          toast.error("Error Updating Description");
        }
      
    }
  )
  };

  return (
    <>
      <HeaderEditor isScrolled={60}/>
      <div className="bg-slate-800 rounded-xl">
        <div id="container" className="p-20 w-auto flex px-24 justify-center relative">
          <div className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
            <div className="mr-10">
              {profileData.profilePic ? (
                <img
                  className="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
                  src={profileData.profilePic}
                  alt="Profile"
                />
              ) : (
                <svg
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              )}
              <input type="file" accept="image/*" onChange={handleProfilePicChange} />
              <button onClick={handleProfilePicUpload} className="text-white bg-gray-700 p-2 rounded mt-2">
                Upload Picture
              </button>
            </div>
            {preview && 
            (<img src={preview} className="mt-2 rounded-md w-24 h-24 object-cover"/>)}
            <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
              <h1 className="text-white font-bold text-3xl mt-6 mb-8">
                Hey, it's me, {profileData.name}
              </h1>
              {isEditing ? (
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="text-black p-2 rounded"
                />
              ) : (
                <p className="text-white w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
                  {profileData.desc}
                </p>
              )}
              {isEditing ? (
                <button onClick={handleTextChange} className="text-white bg-gray-700 p-2 rounded">
                  Save
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="text-white bg-gray-700 p-2 rounded">
                  Edit Text
                </button>
              )}
              <div id="info" className="flex flex-wrap justify-start items-center gap-4">
                <a
                  rel="noopener"
                  target="_blank"
                  // href="https://github.com/iam-aydin"
                  className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white"
                >
                  <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <span>No of edits: {profileData.edits}</span>
                </a>
                <a rel="noopener" target="_blank" className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white">
                  <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#ff0000]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                    </svg>
                  </span>
                  <span>Organizer: {(profileData?.organizer)?(<span>{profileData.organizer}</span>):(<span>None</span>)}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
      <Footer/></div>
    </>
  );
}
