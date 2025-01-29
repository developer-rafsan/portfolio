import { BASE_URL } from "./apiHelper";
import { commonApi } from "./commonApi";

export const loginApi = async (data) => {
  return commonApi("POST", `${BASE_URL}/login`, data);
};

export const projectCreateApi = async (data) => {
  return commonApi("POST",`${BASE_URL}/create-project`, data);
};

export const projectGetApi = async (page, filterCategory,sort, search) => {
  return commonApi("GET",`${BASE_URL}/project?page=${page}&sort=${sort}&category=${filterCategory.toString()}&search=${search}`);
};

export const projectDeletetApi = async (id) => {
  return commonApi("DELETE", `${BASE_URL}/project/${id}`);
};

export const categoryGetApi = async () => {
  return commonApi("GET", `${BASE_URL}/getCategory`);
};

export const categoryCreateApi = async (data) => {
  return commonApi("POST", `${BASE_URL}/create-category`, data);
};

export const fileClean = async () => {
  return commonApi("GET", `${BASE_URL}/reset`);
};
