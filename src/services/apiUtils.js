import { api } from "./api"; // eslint-disable-line no-unused-vars

export const handleApiCall = async (call, errorMessage, transformResponse = (data) => data) => {
  try {
    const response = await call();
    return transformResponse(response.data); // Apply transformResponse
  } catch (error) {
    console.error(errorMessage, error.response?.data || error.message);
    throw error;
  }
};