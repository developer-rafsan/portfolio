import axios from "axios";

export const commonAPI = async (method, url, body, header) => {
  // api configer data 
  const config = {
    method,
    url,
    headers: header ? header : { "Content-type": "application/json" },
    data: body ? body : "",
  };

  // axios api call req
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
};
