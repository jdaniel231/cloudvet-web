import { api } from "./api";

export const getUsers = async () => {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw error;
  }
};