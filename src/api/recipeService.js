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

export const getRecipeDetail = async (id) => {
  const response = await axiosClient.get(`/recipe/${id}`);
  return response.data;
};

export const searchRecipes = async (title) => {
  const response = await axiosClient.get(`/recipe/search`, {
    params: {
      title,
    },
  });
  return response.data;
};

export const downloadRecipe = async (id) => {
  const response = await axiosClient.get(`/recipe/download/${id}`, {
    responseType: 'blob',
  });
  return response.data;
};

export const generateRecipe = async (ingredients) => {
  // Pass the string directly. If it expects a quoted string, we can format it.
  const response = await axiosClient.post(`/recipe/generate`, `"${ingredients}"`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
