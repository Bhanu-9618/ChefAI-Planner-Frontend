import { useState } from "react";
import { ChefHat, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";

// ─── Mock Data (25 recipes) ───────────────────────────────────────────────────
const MOCK_RECIPES = [
  { id: 1,  title: "Garlic Butter Chicken",       ingredients: "Chicken breast, Garlic, Butter, Lemon, Rosemary" },
  { id: 2,  title: "Creamy Tomato Pasta",          ingredients: "Pasta, Tomatoes, Cream, Garlic, Basil, Parmesan" },
  { id: 3,  title: "Spinach & Egg Stir Fry",       ingredients: "Eggs, Spinach, Garlic, Soy sauce, Sesame oil" },
  { id: 4,  title: "Cheesy Baked Potatoes",        ingredients: "Potatoes, Cheddar cheese, Butter, Sour cream, Chives" },
  { id: 5,  title: "Lemon Herb Salmon",            ingredients: "Salmon fillet, Lemon, Dill, Garlic, Olive oil" },
  { id: 6,  title: "Vegetable Fried Rice",         ingredients: "Rice, Carrots, Peas, Eggs, Soy sauce, Green onion" },
  { id: 7,  title: "Mushroom Risotto",             ingredients: "Arborio rice, Mushrooms, Onion, Parmesan, Butter, Wine" },
  { id: 8,  title: "Honey Garlic Shrimp",          ingredients: "Shrimp, Honey, Garlic, Soy sauce, Butter, Lemon" },
  { id: 9,  title: "Avocado Toast with Egg",       ingredients: "Bread, Avocado, Eggs, Chili flakes, Lemon, Salt" },
  { id: 10, title: "Beef Tacos",                   ingredients: "Ground beef, Taco shells, Cheddar, Lettuce, Salsa, Sour cream" },
  { id: 11, title: "Thai Green Curry",             ingredients: "Chicken, Green curry paste, Coconut milk, Zucchini, Basil" },
  { id: 12, title: "Classic Caesar Salad",         ingredients: "Romaine lettuce, Croutons, Parmesan, Caesar dressing, Lemon" },
  { id: 13, title: "Butter Chicken",               ingredients: "Chicken, Tomato sauce, Cream, Garam masala, Ginger, Garlic" },
  { id: 14, title: "Caprese Bruschetta",           ingredients: "Baguette, Tomatoes, Mozzarella, Basil, Olive oil, Balsamic" },
  { id: 15, title: "Veggie Omelette",              ingredients: "Eggs, Bell pepper, Onion, Cheese, Spinach, Butter" },
  { id: 16, title: "Spaghetti Carbonara",          ingredients: "Spaghetti, Pancetta, Eggs, Parmesan, Black pepper, Garlic" },
  { id: 17, title: "Chicken Quesadillas",          ingredients: "Chicken, Tortillas, Cheese, Bell pepper, Onion, Sour cream" },
  { id: 18, title: "Lentil Soup",                  ingredients: "Red lentils, Tomatoes, Onion, Cumin, Garlic, Lemon" },
  { id: 19, title: "Pesto Pasta",                  ingredients: "Pasta, Basil pesto, Cherry tomatoes, Parmesan, Pine nuts" },
  { id: 20, title: "Stuffed Bell Peppers",         ingredients: "Bell peppers, Ground beef, Rice, Tomato sauce, Cheese" },
  { id: 21, title: "Greek Salad",                  ingredients: "Cucumber, Tomatoes, Olives, Feta cheese, Red onion, Olive oil" },
  { id: 22, title: "Chicken Soup",                 ingredients: "Chicken, Carrots, Celery, Onion, Noodles, Thyme, Garlic" },
  { id: 23, title: "Banana Pancakes",              ingredients: "Bananas, Eggs, Oats, Cinnamon, Honey, Vanilla" },
  { id: 24, title: "Tuna Salad Sandwich",          ingredients: "Tuna, Mayo, Celery, Lemon, Bread, Lettuce, Mustard" },
  { id: 25, title: "Chickpea Curry",               ingredients: "Chickpeas, Coconut milk, Tomatoes, Onion, Cumin, Garam masala" },
];

const PER_PAGE = 12;

// ─── Recipe Card ──────────────────────────────────────────────────────────────
function RecipeCard({ recipe }) {
  return (
    <div className="group bg-white/4 border border-white/8 hover:bg-white/6 hover:border-white/15 rounded-2xl p-5 transition-all duration-300 cursor-pointer">
      {/* Card Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
          <ChefHat size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <button
          id={`download-recipe-${recipe.id}`}
          title="Download PDF"
          className="ml-auto p-1.5 rounded-lg text-white/25 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); console.log("Download", recipe.title); }}
        >
          <FileDown size={15} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-orange-100 transition-colors duration-200">
        {recipe.title}
      </h3>

      {/* Ingredients */}
      <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
        {recipe.ingredients}
      </p>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        id="pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-xl border transition-all duration-200 ${
          currentPage === 1
            ? "border-white/6 text-white/15 cursor-not-allowed"
            : "border-white/10 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20"
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          id={`pagination-page-${page}`}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all duration-200 ${
            page === currentPage
              ? "bg-gradient-to-br from-orange-500 to-rose-500 border-transparent text-white shadow-lg shadow-orange-500/25"
              : "border-white/10 text-white/45 hover:text-white hover:bg-white/8 hover:border-white/20"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        id="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-xl border transition-all duration-200 ${
          currentPage === totalPages
            ? "border-white/6 text-white/15 cursor-not-allowed"
            : "border-white/10 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20"
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── My Recipes Page ──────────────────────────────────────────────────────────
export default function MyRecipesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MOCK_RECIPES.length / PER_PAGE);
  const startIdx = (currentPage - 1) * PER_PAGE;
  const currentRecipes = MOCK_RECIPES.slice(startIdx, startIdx + PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />

      {/* Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-rose-500/4 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
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
            {MOCK_RECIPES.length} saved recipes · Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
