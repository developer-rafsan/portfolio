import axios from "axios";

export const commonApi = async (method, url, header, body) => {
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

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log(error);

    const err = error.response.data;
    return err;
  }
};
