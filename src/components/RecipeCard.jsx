import { ChefHat, FileDown } from "lucide-react";
import { downloadRecipeFile } from "../utils/downloadUtils";

export default function RecipeCard({ recipe, onClick }) {
  const ingredientPreview = recipe.ingredients?.split('\n')[0] || recipe.ingredients;

  return (
    <div
      onClick={onClick}
      className="group bg-white/4 border border-white/8 hover:bg-white/7 hover:border-orange-500/25 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-orange-500/5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
          <ChefHat size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <button
          id={`download-card-${recipe.id}`}
          title="Download PDF"
          className="ml-auto p-1.5 rounded-lg text-white/20 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); downloadRecipeFile(recipe.id, recipe.title); }}
        >
          <FileDown size={15} />
        </button>
      </div>
      <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-orange-100 transition-colors duration-200">
        {recipe.title}
      </h3>
      <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
        {ingredientPreview}
      </p>
    </div>
  );
}
