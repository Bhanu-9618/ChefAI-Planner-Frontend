import axiosClient from "./axiosClient";

const userService = {
  getUserProfile: async (id) => {
    const response = await axiosClient.get(`/user/${id}`);
    return response.data;
  },
};

export default userService;
