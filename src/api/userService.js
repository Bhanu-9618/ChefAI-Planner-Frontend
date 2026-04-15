import axiosClient from "./axiosClient";

const userService = {
  getUserProfile: async (id) => {
    const response = await axiosClient.get(`/user/${id}`);
    return response.data;
  },
  updateUserProfile: async (id, data) => {
    const response = await axiosClient.put(`/user/${id}`, data);
    return response.data;
  },
};

export default userService;
