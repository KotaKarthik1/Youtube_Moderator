// Importing constants
import apiPath from "../constants/api-path.constant";

import axios from "../configs/axios-instances";

const orgApi = {
  handleYoutubeNameChange: ({ payload, success, error }) => {
    const {orgDashboard: { handleYoutubeNameChange }} = apiPath;

    axios.postRequest({ path: handleYoutubeNameChange, payload, success, error });
  },
  handleGetRequests: ({ payload, success, error }) => {
    const {orgDashboard: { handleGetRequests }} = apiPath;
    axios.postRequest({ path: handleGetRequests, payload, success, error });
  },
  handleAcceptRequest: ({ payload, success, error }) => {
    const {orgDashboard: { handleAcceptRequest }} = apiPath;
    axios.postRequest({ path: handleAcceptRequest, payload, success, error });
  },
  handleRejectRequest: ({ payload, success, error }) => {
    const {orgDashboard: { handleRejectRequest }} = apiPath;
    axios.postRequest({ path: handleRejectRequest, payload, success, error });
  },
  handleGetAllEditors: ({ payload, success, error }) => {
    const {orgDashboard: { handleGetAllEditors }} = apiPath;
    axios.postRequest({ path: handleGetAllEditors, payload, success, error });
  },
  handleCreateTask:({payload,success,error})=>{
    const {orgDashboard:{handleCreateTask}}=apiPath;
    axios.postRequest({path:handleCreateTask,payload,success,error});
  },
  handleRemoveEditor:({payload,success,error})=>{
    const {orgDashboard:{handleRemoveEditor}}=apiPath;
    axios.postRequest({path:handleRemoveEditor,payload,success,error});
  },
  handleGetAllTasks:({payload,success,error})=>{
    const {orgDashboard:{handleGetAllTasks}}=apiPath;
    axios.postRequest({path:handleGetAllTasks,payload,success,error});
  },
  handleTaskViewDetail:({payload,success,error})=>{
    const {orgDashboard:{handleTaskViewDetail}}=apiPath;
    axios.postRequest({path:handleTaskViewDetail,payload,success,error});
  },
  handleRawVideoUpdate:({payload,success,error})=>{
    const {orgDashboard:{handleUpdateRawVidoes}}=apiPath;
    axios.postRequest({path:handleUpdateRawVidoes,payload,success,error});
  },
  handleStatusChange:({payload,success,error})=>{
    const {orgDashboard:{handleStatusChange}}=apiPath;
    axios.postRequest({path:handleStatusChange,payload,success,error});
  },
  handleYoutubeUpload:({payload,success,error})=>{
    const {orgDashboard:{handleYoutubeUpload}}=apiPath;
    axios.postRequest({path:handleYoutubeUpload,payload,success,error});
  },

  
};

export default orgApi;
