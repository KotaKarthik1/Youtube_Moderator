// Importing constants
import apiPath from "../constants/api-path.constant";

import axios from "../configs/axios-instances";

const editorApi = {
  handleTextChange: ({ payload, success, error }) => {
    const {editorDashboard: { handleTextChange }} = apiPath;
    axios.postRequest({ path: handleTextChange, payload, success, error });
  },
  handleImageChange:({payload,success,error})=>{
    const {editorDashboard:{handleProfilePicUpload}}=apiPath;
    axios.postRequest({path:handleProfilePicUpload,payload,success,error});
  },
  handleTaskCount:({payload,success,error})=>{
    const {editorDashboard:{handleTaskCount}}=apiPath;
    axios.getRequest({path:handleTaskCount,payload,success,error});
  },
  handleGetAllTasks:({payload,success,error})=>{
    const {editorDashboard:{handleGetAllTasks}}=apiPath;
    axios.postRequest({path:handleGetAllTasks,payload,success,error});
  },
  handleGetTaskDetail:({payload,success,error})=>{
    const {editorDashboard:{handleGetTaskDetail}}=apiPath;
    axios.postRequest({path:handleGetTaskDetail,payload,success,error});
  },
  handleUpdateEditedVideos:({payload,success,error})=>{
    const {editorDashboard:{handleUpdateEditedVideos}}=apiPath;
    axios.postRequest({path:handleUpdateEditedVideos,payload,success,error});
  },
  
};

export default editorApi;
