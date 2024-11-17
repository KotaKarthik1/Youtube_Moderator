// Importing constants
import apiPath from "../constants/api-path.constant";

import axios from "../configs/axios-instances";

const orgApi = {
  handle: ({ payload, success, error }) => {
    const {auth: { editorLogin }} = apiPath;

    axios.postRequest({ path: editorLogin, payload, success, error });
  }
};

export default orgApi;
