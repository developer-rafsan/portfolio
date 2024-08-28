import axios from "axios";

export const commonAPI = async (method, url, body, header) => {
  const config = {
    method,
    url,
    headers: header
      ? header
      : {
          "Content-type": "application/json",
        },
    data: body ? body : "",
  };

  //   axios api call
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
};
