import axios from "axios";

// const apiBaseUrl = "https://ai.webvio.in/backend/backend";
// const token = "key_fefba4090316b557a67e930307bf"
// const token = localStorage.getItem("token");
const apiBaseUrl = "https://ai.webvio.in/backend/backend";
// const apiBaseUrl = "http://localhost:8000/backend";
const token = "key_fefba4090316b557a67e930307bf"
// const apiBaseUrl = process.env.BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

// python POST method
export const pythonPostFunction = async(endpoint, data) =>{
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    // console.error("Error: ", error);
    return error.response.data;
  }
}

// General Get function
export const generalGetFunction = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    // console.error("Error: ", error);
    return error.response.data;
  }
};

// General Post function
export const generalPostFunction = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    // console.error("Error: ", error);
    return error.response.data;
  }
};

// General Put function
export const generalPutFunction = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    // console.error("Error: ", error);
    return error.response.data;
  }
};

// General Delete function
export const generalDeleteFunction = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    // console.error("Error: ", error);
    return error.response.data;
  }
};

// General Patch function
export const generalPatchFunction = async (endpoint, data) => {
  try {
    const response = await axiosInstance.patch(endpoint, data);
    return response.data;
  } catch (error) {
    // console.error("Error: ", error);
    return error.response.data;
  }
};
