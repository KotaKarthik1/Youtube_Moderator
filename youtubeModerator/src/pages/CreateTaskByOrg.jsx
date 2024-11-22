import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiX, FiCheck } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import orgApi from "../apis/org.api";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";
import Footer from "../Components/Footer";
const CreateTaskByOrg = () => {
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [totalEditors, setTotalEditors] = useState([]);
  const [selectedEditor, setSelectedEditor] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState(""); // Added name state
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUser);

  const fetchAllEditors = () => {
    orgApi.handleGetAllEditors({
      payload: {
        id: currentLoggedInUser?._id,
      },
      success: (res) => {
        console.log(res.data.editors);
        setTotalEditors(res.data.editors);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  useEffect(() => {
    fetchAllEditors();
  }, []);

  const onDrop = (acceptedFiles) => {
    const videoFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("video/")
    );
    setVideos((prev) => [...prev, ...videoFiles]);
    setErrors((prev) => ({ ...prev, videos: "" }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (videos.length === 0) {
      newErrors.videos = "Please upload at least one video";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!selectedEditor) {
      newErrors.selectedEditor = "Please select a editor";
    }
    if (!selectedDate) {
      newErrors.date = "Please select a date";
    }
    if (!name.trim()) { // Added name validation
        newErrors.name = "Name is required";
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const formData = new FormData();

//       setIsSubmitting(true);

//       // Simulating API call
//       orgApi.handleCreateTask({
//         payload: {},
//         success: (res) => {
//           setVideos([]);
//           setDescription("");
//           setSelectedEditor("");
//           setSelectedDate(null);
//           setIsSubmitting(false);
//         },
//         error: (err) => {
//           console.error("Error submitting form:", error);
//           setIsSubmitting(false);
//         },
//       });
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (validateForm()) {
      setIsSubmitting(true);
  
      try {
        // Create FormData object
        const formData = new FormData();
        console.log(selectedEditor);
        // Add task details to the FormData
        formData.append("taskName",name);
        formData.append("organizerId", currentLoggedInUser?._id); // Organizer ID
        formData.append("editorId", selectedEditor); // Editor ID
        formData.append("taskDetails", description); // Task description
        formData.append("deadline", selectedDate?.toISOString()); // Convert deadline to ISO string
        
        // Append video files
        videos.forEach((video, index) => {
          formData.append(`videos`, video); // All videos go under "videos" field
        });
  
        // API call to create the task
        orgApi.handleCreateTask({
          payload: formData,
          success: (res) => {
            console.log("Task created successfully:", res.data);
  
            // Reset form after successful submission
            setVideos([]);
            setDescription("");
            setSelectedEditor({});
            setSelectedDate(null);
            setErrors({});
            setIsSubmitting(false);
          },
          error: (err) => {
            console.error("Error creating task:", err);
            setIsSubmitting(false);
          },
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        setIsSubmitting(false);
      }
    }
  };
  

  return (
    <>
      <div className="mt-28 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300"
          aria-label="Video upload form"
        >

<div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`block w-full rounded-lg border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter task name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Upload Videos
          </h2>

          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input {...getInputProps()} aria-label="Video upload area" />
            <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">
              Drag & drop videos here, or click to select
            </p>
            {errors.videos && (
              <p className="text-red-500 mt-2 text-sm">{errors.videos}</p>
            )}
          </div>

          {videos.length > 0 && (
            <div className="space-y-3">
              {videos.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span className="text-sm text-gray-600 truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove video"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="editor"
              className="block text-sm font-medium text-gray-700"
            >
              Select Editor
            </label>
            <select
              id="editor"
              value={selectedEditor}
              onChange={(e) => 
                
                {console.log(e);
                    setSelectedEditor(e.target.value);
                }
              }
              className={`block w-full rounded-lg border ${
                errors.selectedEditor ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.selectedEditor ? "true" : "false"}
            >
              <option value="">Select editor</option>
              {totalEditors?.map((editor) => (
                <option key={editor?._id} value={editor?._id}>
                  {editor.name}
                </option>
              ))}
            </select>
            {errors.selectedEditor && (
              <p className="text-red-500 text-sm">{errors.selectedEditor}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className={`block w-full rounded-lg border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              minDate={new Date()}
              showDisabledMonthNavigation
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`block w-full rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter video description..."
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            aria-label="Submit form"
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
                <FiCheck className="mr-2" /> Submit
              </span>
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateTaskByOrg;
