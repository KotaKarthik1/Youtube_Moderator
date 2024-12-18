const BASEURL = import.meta.env.VITE_REACT_APP_BACKEND;

const setBaseUrlPrefix = (path) => {
  return BASEURL.concat(path);
};

const apiPathConstants = {
  auth: {
    editorLogin: setBaseUrlPrefix("/EditorLogin"),
    editorLogout: setBaseUrlPrefix("/EditorLogout"),
    checkOrgStatus:setBaseUrlPrefix("/auth/verifyorg"),
    orgLogout:setBaseUrlPrefix('/auth/orgLogout'),
    checkUserStatus:setBaseUrlPrefix("/auth/user"),
    editorRegister: setBaseUrlPrefix("/EditorRegister"),
    verifySession: setBaseUrlPrefix("/auth/verify-session"),
    changePassword: setBaseUrlPrefix("/auth/reset-password"),
    forgotPassword: setBaseUrlPrefix("/auth/forgot-password"),
    verificationEmail: setBaseUrlPrefix("/auth/verify-email/"),
  },
  authProvider:{
    login: setBaseUrlPrefix("/auth/provider/login"),
    logout: setBaseUrlPrefix("/auth/provider/logout"),
    register: setBaseUrlPrefix("/auth/provider/register"),
    verifySession: setBaseUrlPrefix("/auth/provider/verify-session"),
    changePassword: setBaseUrlPrefix("/auth/provider/reset-password"),
    forgotPassword: setBaseUrlPrefix("/auth/provider/forgot-password"),
    verificationEmail: setBaseUrlPrefix("/auth/provider/verify-email/"),
  },
  editorDashboard:{
    handleTextChange:setBaseUrlPrefix("/EditorDescChange"),
    handleProfilePicUpload:setBaseUrlPrefix("/EditorProfileImageChange"),
    handleTaskCount:setBaseUrlPrefix("/EditorTotalTasksCount"),
    handleGetAllTasks:setBaseUrlPrefix("/handleGetAllTasksEditor"),
    handleGetTaskDetail:setBaseUrlPrefix("/handleGetTaskDetail"),
    handleUpdateEditedVideos:setBaseUrlPrefix('/handleUpdateEditedVideos'),
  },
  orgDashboard:{
    handleYoutubeNameChange:setBaseUrlPrefix("/handleYoutubeNameChange"),
    handleGetRequests:setBaseUrlPrefix("/handleGetAllRequestsOrg"),
    handleAcceptRequest:setBaseUrlPrefix("/handleAcceptEditor"),
    handleRejectRequest:setBaseUrlPrefix("/handleRejectEditor"),
    handleGetAllEditors:setBaseUrlPrefix("/handleGetAllEditors"),
    handleCreateTask:setBaseUrlPrefix('/handleCreateTask'),
    handleRemoveEditor:setBaseUrlPrefix('/handleRemoveEditor'),
    handleGetAllTasks:setBaseUrlPrefix('/handleGetAllTasks'),
    handleTaskViewDetail:setBaseUrlPrefix('/handleTaskViewDetail'),
    handleUpdateRawVidoes:setBaseUrlPrefix('/handleRawVideoUpdate'),
    handleStatusChange:setBaseUrlPrefix('/handleStatusChangeForTask'),
    handleYoutubeUpload:setBaseUrlPrefix('/handleYoutubeUpload')
  }
};

export default apiPathConstants;
