import { commonAPI } from "./apiCall";
import { BASE_URL, YOUTUBE_URL } from "./apihelper";

// Helper to build query strings efficiently
const buildQuery = (params) =>
  Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(
          Array.isArray(v) ? v.join(",") : v
        )}`
    )
    .join("&");

// Get all projects API (optimized: skip empty params, avoid unnecessary .toString())
export const getProjectApi = (page, filterCategory, sort, search) => {
  const params = {
    page,
    sort,
    category: filterCategory && filterCategory.length ? filterCategory : undefined,
    search,
  };
  const query = buildQuery(params);
  return commonAPI("GET", `${BASE_URL}/project${query ? "?" + query : ""}`);
};

// Get category API
export const getCategoryApi = () => commonAPI("GET", `${BASE_URL}/getCategory`);

// Get YouTube video API
export const getYoutubeApi = () => commonAPI("GET", YOUTUBE_URL);

// File download API
export const downloadApi = (id) => commonAPI("GET", `${BASE_URL}/download/${id}`);