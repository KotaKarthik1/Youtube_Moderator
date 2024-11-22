import React, { useEffect, useState,useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaYoutube, FaDownload, FaChevronDown, FaChevronUp, FaCheckCircle, FaPlus } from "react-icons/fa";
import Footer from "../Components/Footer";
import orgApi from "../apis/org.api";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";

const OrgTaskView = () => {
  const [activeAccordion, setActiveAccordion] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoEdited,setSelectedVideoEdited]=useState(null);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeData, setYoutubeData] = useState({
    title: "",
    description: "",
    selectedVideo: null,
  });
  const searchParams = new URLSearchParams(window.location.search);
  const taskId = searchParams.get("taskId");
  const [taskData, setTaskDetails] = useState({});
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [uploadedRawVideos, setUploadedRawVideos] = useState([]);
  const [description, setVideoDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
  useRecoilState(currentUser);
  const [status, setStatus] = useState("");


  const fetchTaskDetails = () => {
    orgApi.handleTaskViewDetail({
      payload: { taskId },
      success: (res) => {
        console.log(res.data);
        setTaskDetails(res.data);
        setStatus(res.data.taskStatus)
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const videoFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("video/")
    );
    setUploadedRawVideos([...uploadedRawVideos, ...videoFiles]);
    console.log("uploadedRawVideos are",uploadedRawVideos);
  }, [uploadedRawVideos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": []
    },
    multiple:true
  });

  const handleSubmitRawVideos = () => {
    // Here you would typically upload the videos to your server

    // Create FormData object
    setIsSubmitting(true);
    console.log("the videos",uploadedRawVideos);
    const formData = new FormData();
    // Add task details to the FormData
    formData.append("taskId",taskId);
    formData.append("orgId", currentLoggedInUser?._id); // Organizer ID
    formData.append("description", description); // Task description

     // Append video files
    uploadedRawVideos.forEach((video, index) => {
      formData.append(`videos`, video); // All videos go under "videos" field
    });

    console.log("form data is ",formData);

    orgApi.handleRawVideoUpdate({
      payload:formData,
      success: (res) => {
        console.log("Task created successfully:", res.data);
        setUploadedRawVideos([]);
        setVideoDescription("");
        toast.success("Raw Videos Updated successfully!");
        setIsSubmitting(false);
        setShowAddVideoModal(false);
        fetchTaskDetails();
      },
      error: (err) => {
        console.error("Error creating task:", err);
        setIsSubmitting(false);
        setIsSubmitting(false);
        toast.error("Error uploading videos");
      },
    })
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? "" : section);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleVideoClickEdited = (video)=>{
    setSelectedVideoEdited(video);
    console.log("edited video",video);
  }

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleYouTubeUpload = (video) => {
    setYoutubeData({ ...youtubeData, selectedVideo: video });
    setShowYoutubeModal(true);
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    orgApi.handleYoutubeUpload({
      payload:{
        videoUrl:youtubeData.selectedVideo.url,
        title:youtubeData.title,
        description:youtubeData.description,
        taskId:taskId,
        videoId:youtubeData.selectedVideo._id
      },
      success:(res)=>{
        console.log("uploaded to youtube successfully");
        toast.success("Video Uploaded to youtube ");
        setYoutubeData({
          title: "",
          description: "",
          selectedVideo: null,
        });
        setShowYoutubeModal(false);
        fetchTaskDetails();
      },
      error:(err)=>{
        console.log(err);
        toast.error("Error uploading video to youtube");
      }
    })
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // API call simulation
      orgApi.handleStatusChange({
        payload:{
          id:currentLoggedInUser?._id,
          taskId,
          newStatus
        },
        success:(res)=>{
          console.log(res);
          setStatus(newStatus);
          toast.success(res.data.message);
          fetchTaskDetails();
        },
        err:(err)=>{
          toast.error("Error chaning state");
          console.log(err);
          fetchTaskDetails();
        }
      })
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-gray-900 p-8">
        <div className="w-full h-full bg-gray-900 rounded-lg shadow-lg text-white">
          {/* Task Details Section */}
          <div className="mb-8 mt-28">
            <h2 className="text-3xl font-bold mb-6 text-white">Task Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800 rounded-lg">
                <p className="text-lg text-gray-400">Task Name</p>
                <p className="font-semibold text-xl text-white">
                  {taskData.taskName}
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <p className="text-lg text-gray-400">Editor Name</p>
                <p className="font-semibold text-xl text-white">
                  {taskData.editorName}
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <p className="text-lg text-gray-400">Status</p>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="font-semibold text-xl text-white bg-gray-800 border-none outline-none cursor-pointer"
                >
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <p className="text-lg text-gray-400">Deadline</p>
                <p className="font-semibold text-xl text-white">
                  {taskData.deadline}
                </p>
              </div>
            </div>
          </div>

          {/* Raw Videos Accordion */}
          <div className="mb-6">
            <button
              className="w-full flex justify-between items-center p-6 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => toggleAccordion("raw")}
              aria-expanded={activeAccordion === "raw"}
            >
              <span className="font-semibold text-xl text-white">
                Raw Video URLs
              </span>
              <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddVideoModal(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                <span>Add Update</span>
              </button>
              {activeAccordion === "raw" ? <FaChevronUp className="text-white text-xl" /> : <FaChevronDown className="text-white text-xl" />}
            </div>
              {/* {activeAccordion === "raw" ? (
                <FaChevronUp className="text-white text-xl" />
              ) : (
                <FaChevronDown className="text-white text-xl" />
              )} */}
            </button>
            {activeAccordion === "raw" && (
              <div className="p-6 border-2 border-gray-700 rounded-b-lg bg-gray-800">
                {taskData.rawUrls.map((video) => (
                  <div
                    key={video?.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg mb-2"
                  >
                    <button
                      className="text-blue-400 hover:text-blue-300 text-lg"
                      onClick={() => handleVideoClick(video)}
                    >
                      {video}
                    </button>
                    <button
                      className="text-gray-400 hover:text-white text-xl"
                      onClick={() => handleDownload(video)}
                      aria-label="Download video"
                    >
                      <FaDownload />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Add Update Modal */}
        {showAddVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8 z-50">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full">
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white">Add Update</h3>
                  <button
                    className="text-gray-400 hover:text-white text-3xl"
                    onClick={() => setShowAddVideoModal(false)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Enter video description"
                  ></textarea>
                </div>

                <div
                  {...getRootProps()}
                  className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-blue-500 bg-blue-50 bg-opacity-10" : "border-gray-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-blue-400">Drop the video files here...</p>
                  ) : (
                    <p className="text-gray-400">Drag and drop video files here, or click to select files</p>
                  )}
                </div>

                {uploadedRawVideos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4">Selected Videos:</h4>
                    <div className="space-y-2">
                      {uploadedRawVideos.map((video) => (
                        <div key={video.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <span>{video.name}</span>
                          <button
                            onClick={() => setUploadedRawVideos(uploadedRawVideos.filter((v) => v.id !== video.id))}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAddVideoModal(false)}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  {/* <button
                    onClick={handleSubmitRawVideos}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={uploadedRawVideos.length === 0}
                  >
                    Upload Videos
                  </button> */}
                  <button
            type="submit"
            disabled={isSubmitting || uploadedRawVideos.length === 0}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            aria-label="Submit form"
            onClick={handleSubmitRawVideos}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FiCheck className="mr-2" /> Upload Videos
              </span>
            )}
          </button>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* Edited Videos Accordion */}
          <div className="mb-6">
            <button
              className="w-full flex justify-between items-center p-6 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => toggleAccordion("edited")}
              aria-expanded={activeAccordion === "edited"}
            >
              <span className="font-semibold text-xl text-white">
                Edited Video URLs
              </span>
              {activeAccordion === "edited" ? (
                <FaChevronUp className="text-white text-xl" />
              ) : (
                <FaChevronDown className="text-white text-xl" />
              )}
            </button>
            {activeAccordion === "edited" && (
              <div className="p-6 border-2 border-gray-700 rounded-b-lg bg-gray-800">
                {taskData?.editedUrls?.map((video) => (
                  <div
                    key={video?.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg mb-2"
                  >
                    <button
                      className="text-blue-400 hover:text-blue-300 text-lg"
                      onClick={() => handleVideoClickEdited(video)}
                    >
                      {video.url}
                    </button>
                    <div className="flex space-x-4">
                      <button
                        className="text-gray-400 hover:text-white text-xl"
                        onClick={() => handleDownload(video.url)}
                        aria-label="Download video"
                      >
                        <FaDownload />
                      </button>
                      {video?.uploadedToYoutube? (
                      <div className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white rounded-lg">
                        <FaCheckCircle className="text-xl" />
                        <span>Uploaded to YouTube</span>
                      </div>
                    ) : (
                      <button
                        className="flex items-center space-x-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-lg"
                        onClick={() => handleYouTubeUpload(video)}
                      >
                        <FaYoutube className="text-xl" />
                        <span>Upload</span>
                      </button>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Player Modal */}
          {/* {selectedVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8">
              <div className="bg-gray-900 rounded-lg w-[800px] h-[450px]">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <button
                      className="text-gray-400 hover:text-white text-3xl"
                      onClick={() => setSelectedVideo(null)}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4 h-[calc(100%-4rem)] flex items-center justify-center">
                  <video
                    className="w-full h-full object-contain rounded-lg"
                    controls
                    src={selectedVideo}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )} */}
          {/* Video Player Modal */}
{/* {selectedVideo && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8">
    <div className="bg-gray-900 rounded-lg w-[800px] h-[450px]">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <button
            className="text-gray-400 hover:text-white text-3xl"
            onClick={() => setSelectedVideo(null)}
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-4 h-[calc(100%-4rem)] flex items-center justify-center">
        {selectedVideo &&
          // Otherwise, use a regular video tag for local files
          <video
            className="w-full h-full object-contain rounded-lg"
            controls
            src={selectedVideo.url} // Ensure `selectedVideo.url` points to the local file URL
          >
            Your browser does not support the video tag.
          </video>
        }
      </div>
    </div>
  </div>
)} */}
          {selectedVideo && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8">
    <div className="bg-gray-900 rounded-lg w-[800px] h-[450px]">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <button
            className="text-gray-400 hover:text-white text-3xl"
            onClick={() => setSelectedVideo(null)}
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-4 h-[calc(100%-4rem)] flex items-center justify-center">
        {selectedVideo && (
          <video
            className="w-full h-full object-contain rounded-lg"
            controls
            src={selectedVideo} // Local video file URL
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  </div>
)}

{selectedVideoEdited && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8">
    <div className="bg-gray-900 rounded-lg w-[800px] h-[450px]">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <button
            className="text-gray-400 hover:text-white text-3xl"
            onClick={() => setSelectedVideoEdited(null)}
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-4 h-[calc(100%-4rem)] flex items-center justify-center">
        {selectedVideoEdited.uploadedToYoutube ? (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${
              selectedVideoEdited.url.split("v=")[1].split("&")[0]
            }`} // Extract video ID from the URL and construct embed URL
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            className="w-full h-full object-contain rounded-lg"
            controls
            src={selectedVideoEdited.url} // Local video file URL
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  </div>
)}




          {/* YouTube Upload Modal */}
          {showYoutubeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8">
              <div className="bg-gray-900 rounded-lg max-w-lg w-full">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-white">
                      Upload to YouTube
                    </h3>
                    <button
                      className="text-gray-400 hover:text-white text-3xl"
                      onClick={() => setShowYoutubeModal(false)}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <form onSubmit={handleYoutubeSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={youtubeData.title}
                      onChange={(e) =>
                        setYoutubeData({
                          ...youtubeData,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Description
                    </label>
                    <textarea
                      value={youtubeData.description}
                      onChange={(e) =>
                        setYoutubeData({
                          ...youtubeData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition-colors"
                  >
                    Upload to YouTube
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default OrgTaskView;
