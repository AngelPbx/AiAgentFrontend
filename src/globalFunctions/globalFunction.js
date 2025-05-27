import axios from "axios";

const apiBaseUrl = "http://localhost:8000/backend";
// const apiBaseUrl = process.env.BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// General Get function
export const generalGetFunction = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

// General Post function
export const generalPostFunction = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

// General Put function
export const generalPutFunction = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

// General Delete function
export const generalDeleteFunction = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

// General Patch function
export const generalPatchFunction = async (endpoint, data) => {
  try {
    const response = await axiosInstance.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
