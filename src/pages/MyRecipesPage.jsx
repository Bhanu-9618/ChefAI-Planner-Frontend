import { useState, useEffect } from "react";
import { ChefHat, ChevronLeft, FileDown, Utensils, CheckCircle2, Search, X } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import { getMyRecipes, getRecipeDetail, searchRecipes } from "../api/recipeService";
import { downloadRecipeFile } from "../utils/downloadUtils";
import FloatingOrbs from "../components/FloatingOrbs";
import StateFeedbackBox from "../components/StateFeedbackBox";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";

function RecipeDetailView({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        const data = await getRecipeDetail(recipeId);
        setRecipe(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <DashboardNavbar />
        <FloatingOrbs position="fixed" />
        <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 flex items-center justify-center min-h-96">
          <StateFeedbackBox icon={ChefHat} title="Loading recipe..." isSpinning={true} iconClassName="text-orange-400" />
        </main>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <DashboardNavbar />
        <FloatingOrbs position="fixed" />
        <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to My Recipes
          </button>
          <StateFeedbackBox icon={Search} title="Failed to load recipe" subtitle={error} />
        </main>
      </div>
    );
  }

  const ingredientList = recipe.ingredients.split('\n').filter(item => item.trim());
  const instructionList = recipe.instructions.split('\n').filter(item => item.trim());

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />
      <FloatingOrbs position="fixed" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <button
          id="recipe-detail-back-btn"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to My Recipes
        </button>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-xl shadow-orange-500/25 shrink-0">
              <ChefHat size={26} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400/70 mb-1">Saved Recipe</p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                {recipe.title}
              </h1>
            </div>
          </div>
          <button
            id="recipe-detail-download-btn"
            onClick={() => downloadRecipeFile(recipe.id, recipe.title)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 shrink-0"
          >
            <FileDown size={17} />
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/4 border border-white/8 rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
                <Utensils size={15} className="text-orange-400" />
              </div>
              <h2 className="text-base font-black uppercase tracking-widest text-white/70">
                Ingredients
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {ingredientList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5 text-orange-400 text-xs font-black">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/65 leading-relaxed pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/4 border border-white/8 rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 size={15} className="text-emerald-400" />
              </div>
              <h2 className="text-base font-black uppercase tracking-widest text-white/70">
                Instructions
              </h2>
            </div>
            <ol className="flex flex-col gap-5">
              {instructionList.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/20 flex items-center justify-center text-xs font-black text-orange-400">
                    {i + 1}
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MyRecipesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await getMyRecipes(currentPage, 12);
        setRecipes(response.recipes);
        setTotalPages(response.totalPages);
        setTotalRecipes(response.totalRecipes);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    if (!isSearching) {
      fetchRecipes();
    }
  }, [currentPage, isSearching]);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        setSearchLoading(true);
        try {
          const results = await searchRecipes(searchQuery);
          setSearchResults(results);
        } catch (err) {
          console.error("Search failed:", err);
          setSearchResults([]);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setIsSearching(false);
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  if (selectedRecipeId) {
    return <RecipeDetailView recipeId={selectedRecipeId} onBack={() => setSelectedRecipeId(null)} />;
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const displayTotalCount = isSearching ? searchResults.length : totalRecipes;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />
      <FloatingOrbs position="fixed" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm font-semibold text-orange-300 mb-4">
            <FileDown size={14} />
            Saved Recipes
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
            My{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Recipes
            </span>
          </h1>
          <p className="text-white/35 text-base font-light">
            {displayTotalCount} recipe{displayTotalCount !== 1 ? "s" : ""}{searchQuery ? ` found for "${searchQuery}"` : " saved"}
            {displayTotalCount > 0 && !isSearching && totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 focus-within:border-orange-500/45 focus-within:bg-white/7 focus-within:shadow-lg focus-within:shadow-orange-500/8 rounded-2xl px-4 py-3.5 mb-8 transition-all duration-200">
          <Search size={16} className="text-white/25 shrink-0" />
          <input
            id="my-recipes-search"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search recipe by title"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setSearchResults([]); setIsSearching(false); }}
              className="text-white/25 hover:text-white/60 transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {isSearching ? (
          searchLoading ? (
            <StateFeedbackBox icon={ChefHat} title="Searching recipes..." isSpinning={true} iconClassName="text-orange-400" />
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {searchResults.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                />
              ))}
            </div>
          ) : (
            <StateFeedbackBox icon={Search} title="No recipes found" subtitle="Try searching with different keywords" />
          )
        ) : loading ? (
          <StateFeedbackBox icon={ChefHat} title="Loading recipes..." isSpinning={true} iconClassName="text-orange-400" />
        ) : error ? (
          <StateFeedbackBox icon={Search} title="Failed to load recipes" subtitle={error} />
        ) : recipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <StateFeedbackBox icon={Search} title="No recipes found" subtitle="Start creating your first recipe" />
        )}
      </main>
    </div>
  );
}
