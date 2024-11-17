// Importing constants
import apiPath from "../constants/api-path.constant";

import axios from "../configs/axios-instances";

const orgApi = {
  handleYoutubeNameChange: ({ payload, success, error }) => {
    const {orgDashboard: { handleYoutubeNameChange }} = apiPath;

    axios.postRequest({ path: handleYoutubeNameChange, payload, success, error });
  }

};

export default orgApi;
