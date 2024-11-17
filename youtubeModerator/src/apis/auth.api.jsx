// Importing constants
import apiPath from "../constants/api-path.constant";

import axios from "../configs/axios-instances";

const authApi = {
  handleEditorLogin: ({ payload, success, error }) => {
    const {auth: { editorLogin }} = apiPath;

    axios.postRequest({ path: editorLogin, payload, success, error });
  },
  handleEditorLogout: ({ payload, success, error }) => {
    const {auth: { editorLogout }} = apiPath;

    axios.getRequest({ path: editorLogout, payload, success, error });
  },
  handleEditorRegister: ({ payload, success, error }) => {
    const {auth: { editorRegister }} = apiPath;

    axios.postRequest({ path: editorRegister, payload, success, error });
  },
  handleOrgLogout:({payload, success, error })=>{
    const {auth :{orgLogout}}= apiPath;
    axios.getRequest({path:orgLogout,payload,success,error});
  },
  checkOrgStatus:({payload,success,error,final})=>{
    const {auth :{checkOrgStatus}} =apiPath;
    axios.getRequest({path:checkOrgStatus,payload,success,error,final})
  },

  checkUserStatus:({payload,success,error,final})=>{
    const {auth :{checkUserStatus}} =apiPath;
    axios.getRequest({path:checkUserStatus,payload,success,error,final})
  },
  
  handleRegister: ({ payload, success, error }) => {
    const {
      auth: { register },
    } = apiPath;
    axios.postRequest({ path: register, payload, success, error });
  },
  verifySession: ({ payload, success, error, final }) => {
    const {
      auth: { verifySession },
    } = apiPath;
    axios.postRequest({ path: verifySession, payload, success, error, final });
  },
  handleVerificationEmail: ({ payload, verify_token, success, error }) => {
    const {
      auth: { verificationEmail },
    } = apiPath;
    const pathWithParams = `${verificationEmail}/${verify_token}`;

    axios.postRequest({
      path: pathWithParams,
      payload,
      success,
      error,
    });
  },
  resetPassword: ({ payload, password_reset_token,success, error }) => {
    const {
      auth: { forgotPassword },
    } = apiPath;
    const pathWithParams= `${forgotPassword}/${password_reset_token}`
    axios.postRequest({ path: pathWithParams, payload, success, error });
  },
  changePassword: ({ payload, password_reset_token, success, error }) => {
    const {
      auth: { changePassword },
    } = apiPath;
    const pathWithParams = `${changePassword}/${password_reset_token}`;

    axios.postRequest({
      path: pathWithParams,
      payload,
      success,
      error,
    });
  },
};

export default authApi;
