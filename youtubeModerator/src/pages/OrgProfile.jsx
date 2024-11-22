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
import orgApi from "../apis/org.api";
import { FiChevronDown, FiX } from "react-icons/fi";
export default function OrgProfile() {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentUser);
  const [profileData, setProfileData] = useState({
    profilePic: currentLoggedInUser?.profileImg,
    name: currentLoggedInUser?.name,
    youtubeChannelName:`${(currentLoggedInUser?.youtubeChannelName)?currentLoggedInUser?.youtubeChannelName:' No name'}`
  });
  console.log("profile data is ",profileData);

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(profileData.desc);

  const [activeIndex, setActiveIndex] = useState(null);

  const [editorData,setEditorData] = useState([]);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleRemove = (editorId) => {
    orgApi.handleRemoveEditor({
      payload:{
        id:currentLoggedInUser?._id,
        editorId
      },
      success:(res)=>
      {
        console.log("successfully removed",res.data);
        toast.success("Editor Removed");
        fetchEditors();
      },
      error:(err)=>
      {
        console.log("error occured",err);
        toast.error("Error Removing Editor");
        fetchEditors();
      }

    })
  };

  const fetchEditors = ()=>{
    orgApi.handleGetAllEditors({
      payload:{
        id:currentLoggedInUser?._id
      },
      success:(res)=>{
        console.log("editors data is ",res);
        setEditorData(res.data.editors);
      },
      error:(err)=>{
        console.log("err is ",err);
        setEditorData();
      }
    })
  }
  useEffect(()=>
  {
    fetchEditors();
  },[])
 
  // Update org youtubechannel name
  const handleTextChange = async () => {

    orgApi.handleYoutubeNameChange({
      payload:{newText,id:currentLoggedInUser?._id},
      success:(res)=>{
        console.log("response of handleyoutubeNameChange is ",res);
        setProfileData((prevData) => ({ ...prevData, youtubeChannelName: newText }))
        setIsEditing(false);
      },
      error:(err)=>{
        console.log("Error updating youtube name picture",err);
        toast.error("Error updating youtube name");
      }

    })
  };

  return (
    <>
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
              
            </div>
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
                  Youtube Channel Name:{profileData.youtubeChannelName}
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
              
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editor List</h2>
      {editorData?.map((editor, index) => (
        <div
          key={editor._id}
          className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
            aria-expanded={activeIndex === index}
            aria-controls={`editor-content-${editor._id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FiChevronDown
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
                <span className="font-medium text-gray-800">{editor.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(editor._id);
                }}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label={`Remove ${editor._id}`}
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </button>
          <div
            id={`editor-content-${editor._id}`}
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-48 p-4" : "max-h-0"
            }`}
            role="region"
            aria-labelledby={`editor-heading-${editor._id}`}
          >
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Email:</span> {editor.email}</p>
              <p><span className="font-medium">Description:</span> {editor.description}</p>
              <p><span className="font-medium">Rating</span> {editor.rating}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
      <div className="mt-10">
      <Footer/></div>
    </>
  );
}
