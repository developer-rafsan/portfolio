import axios from "axios";

export const commonApi = async (method, url, body) => {
  const config = {
    method,
    url,
    data: body ? body : "",
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    const err = error.response.data;
    return err;
  }
};
