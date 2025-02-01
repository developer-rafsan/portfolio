import { BASE_URL } from "./apiHelper";
import { commonApi } from "./commonApi";

export const loginApi = async (header, data) => {
  return commonApi("POST", `${BASE_URL}/login`, header, data);
};

export const projectCreateApi = async (header, data) => {
  return commonApi("POST", `${BASE_URL}/create-project`, header, data);
};

export const projectGetApi = async (page, filterCategory, sort, search) => {
  return commonApi(
    "GET",
    `${BASE_URL}/project?page=${page}&sort=${sort}&category=${filterCategory.toString()}&search=${search}`
  );
};

export const projectDeletetApi = async (id, header) => {
  return commonApi("DELETE", `${BASE_URL}/project/${id}`, header);
};

export const categoryGetApi = async () => {
  return commonApi("GET", `${BASE_URL}/getCategory`);
};

export const categoryCreateApi = async (header, data) => {
  return commonApi("POST", `${BASE_URL}/create-category`, header, data);
};

export const fileClean = async (header) => {
  return commonApi("GET", `${BASE_URL}/reset`, header);
};
