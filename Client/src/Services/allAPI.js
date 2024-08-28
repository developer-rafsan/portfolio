import { commonAPI } from "./apiCall";
import { BASE_URL, YOUTUBE_URL } from "./apihelper";

export const getProjectApi = async (page, filterCategory,sort, search) => {
  return await commonAPI("GET",`${BASE_URL}/project?page=${page}&sort=${sort}&category=${filterCategory.toString()}&search=${search}`);
};

export const getCategoryApi = async () => {
  return await commonAPI("GET",`${BASE_URL}/getCategory`);
};

export const getSinglePageApi = async (id) => {
  return await commonAPI("GET",`${BASE_URL}/project/single-page/${id}`);
};

export const getYoutubeApi = async () => {
  return await commonAPI("GET",`${YOUTUBE_URL}`);
};
