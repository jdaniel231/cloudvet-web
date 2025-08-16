import { api } from "./api";
import { handleApiCall } from "./apiUtils";

export const getUsers = async () => {
  return handleApiCall(
    () => api.get("/users"),
    "Failed to fetch users"
  );
};