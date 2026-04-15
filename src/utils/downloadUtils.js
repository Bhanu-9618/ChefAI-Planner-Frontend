import { downloadRecipe } from "../api/recipeService";

export const downloadRecipeFile = async (id, title = 'recipe') => {
  try {
    const blob = await downloadRecipe(id);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed', error);
    throw error;
  }
};
