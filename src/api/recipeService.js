import axiosClient from "./axiosClient";

export const getMyRecipes = async (page = 1, pageSize = 12) => {
  const response = await axiosClient.get(`/recipe/my-recipes`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};
