import { commonAPI } from "./apiCall";
import { BASE_URL, YOUTUBE_URL } from "./apihelper";

// get all project api
export const getProjectApi = async (page, filterCategory,sort, search) => {
  return await commonAPI("GET",`${BASE_URL}/project?page=${page}&sort=${sort}&category=${filterCategory.toString()}&search=${search}`);
};

// get category api
export const getCategoryApi = async () => {
  return await commonAPI("GET",`${BASE_URL}/getCategory`);
};

// get youtube video api
export const getYoutubeApi = async () => {
  return await commonAPI("GET",`${YOUTUBE_URL}`);
};

// file download api
export const downloadApi = async(id)=>{
  return await commonAPI("GET",`${BASE_URL}/download/${id}`);
}