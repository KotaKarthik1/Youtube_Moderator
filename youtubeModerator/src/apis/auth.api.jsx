// Importing constants
import apiPath from "../constants/api-path.constant";

import axios from "../configs/axios-instances";

const authApi = {
  handleLogin: ({ payload, success, error }) => {
    const {auth: { login },} = apiPath;

    axios.postRequest({ path: login, payload, success, error });
  },
  handleLogout: ({ success, error }) => {
    const {
      auth: { logout },
    } = apiPath;
    axios.postRequest({ path: logout, success, error });
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
