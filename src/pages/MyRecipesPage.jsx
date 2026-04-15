import { useState } from "react";
import { ChefHat, ChevronLeft, ChevronRight, FileDown, Utensils, CheckCircle2, Search, X } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";

const MOCK_RECIPES = [
  {
    id: 1,
    title: "Garlic Butter Chicken",
    ingredients: "Chicken breast, Garlic, Butter, Lemon, Rosemary",
    time: "30 mins", serves: "4",
    ingredientList: ["2 chicken breasts", "4 cloves garlic (minced)", "3 tbsp butter", "1 lemon (juiced)", "1 tsp fresh rosemary", "Salt & pepper to taste"],
    instructions: ["Season chicken breasts with salt, pepper, and rosemary on both sides.", "Heat 1 tbsp butter in a skillet over medium-high heat.", "Sear chicken for 6–7 minutes each side until golden and cooked through. Remove and set aside.", "In the same pan, melt remaining butter and sauté garlic for 1 minute until fragrant.", "Add lemon juice and stir. Pour the garlic butter sauce over the chicken.", "Let rest for 2 minutes and serve warm."],
  },
  {
    id: 2,
    title: "Creamy Tomato Pasta",
    ingredients: "Pasta, Tomatoes, Cream, Garlic, Basil, Parmesan",
    time: "25 mins", serves: "3",
    ingredientList: ["250g pasta", "4 ripe tomatoes (chopped)", "100ml heavy cream", "3 cloves garlic", "Fresh basil leaves", "50g Parmesan (grated)", "Olive oil, salt, pepper"],
    instructions: ["Cook pasta in salted boiling water until al dente. Reserve ½ cup pasta water.", "Heat olive oil in a pan, sauté garlic for 1 minute.", "Add chopped tomatoes and cook 10 minutes until sauce thickens.", "Stir in cream and simmer for 3 minutes.", "Toss in cooked pasta with a splash of pasta water. Mix well.", "Top with fresh basil and grated Parmesan before serving."],
  },
  {
    id: 3,
    title: "Spinach & Egg Stir Fry",
    ingredients: "Eggs, Spinach, Garlic, Soy sauce, Sesame oil",
    time: "15 mins", serves: "2",
    ingredientList: ["3 large eggs", "200g fresh spinach", "2 cloves garlic", "2 tbsp soy sauce", "1 tsp sesame oil", "1 tsp vegetable oil"],
    instructions: ["Heat vegetable oil in a wok or skillet over high heat.", "Add minced garlic and stir-fry for 30 seconds.", "Add spinach and toss until wilted, about 2 minutes.", "Push spinach aside, crack eggs in and scramble lightly.", "Mix eggs with spinach, add soy sauce and sesame oil.", "Toss everything together and serve immediately over rice."],
  },
  {
    id: 4,
    title: "Cheesy Baked Potatoes",
    ingredients: "Potatoes, Cheddar cheese, Butter, Sour cream, Chives",
    time: "60 mins", serves: "4",
    ingredientList: ["4 large russet potatoes", "100g cheddar cheese (shredded)", "2 tbsp butter", "4 tbsp sour cream", "Fresh chives (chopped)", "Salt & pepper"],
    instructions: ["Preheat oven to 200°C. Scrub potatoes and prick with a fork.", "Rub with olive oil and salt. Bake directly on oven rack for 50–60 minutes.", "Remove and slice open lengthwise. Fluff the insides with a fork.", "Add butter, season with salt and pepper.", "Top with shredded cheddar and return to oven for 5 minutes.", "Serve with sour cream and fresh chives."],
  },
  {
    id: 5,
    title: "Lemon Herb Salmon",
    ingredients: "Salmon fillet, Lemon, Dill, Garlic, Olive oil",
    time: "20 mins", serves: "2",
    ingredientList: ["2 salmon fillets", "1 lemon (sliced & juiced)", "2 tbsp fresh dill", "2 cloves garlic (minced)", "2 tbsp olive oil", "Salt & pepper"],
    instructions: ["Preheat oven to 200°C. Line a baking tray with foil.", "Place salmon on tray. Drizzle with olive oil and lemon juice.", "Top with garlic, dill, and lemon slices. Season well.", "Bake for 12–15 minutes until salmon flakes easily with a fork.", "Squeeze extra lemon juice on top before serving.", "Serve with steamed vegetables or salad."],
  },
  {
    id: 6,
    title: "Vegetable Fried Rice",
    ingredients: "Rice, Carrots, Peas, Eggs, Soy sauce, Green onion",
    time: "20 mins", serves: "4",
    ingredientList: ["2 cups cooked rice (day-old)", "1 carrot (diced small)", "½ cup peas", "2 eggs", "3 tbsp soy sauce", "2 green onions (sliced)", "2 tbsp vegetable oil"],
    instructions: ["Heat oil in a large wok over high heat.", "Add carrots and stir-fry for 2 minutes. Add peas and cook 1 more minute.", "Push veggies aside, scramble eggs in the pan until just set.", "Add rice and break up any clumps, pressing against the hot wok.", "Pour in soy sauce and toss everything together well.", "Garnish with green onions and serve hot."],
  },
  {
    id: 7,
    title: "Mushroom Risotto",
    ingredients: "Arborio rice, Mushrooms, Onion, Parmesan, Butter, Wine",
    time: "40 mins", serves: "3",
    ingredientList: ["1.5 cups arborio rice", "250g mushrooms (sliced)", "1 onion (diced)", "50g Parmesan", "2 tbsp butter", "½ cup white wine", "4 cups warm vegetable broth"],
    instructions: ["Sauté mushrooms in butter until golden, set aside.", "In the same pan, cook onion until soft. Add rice and toast 2 minutes.", "Pour in wine and stir until absorbed.", "Add broth one ladle at a time, stirring constantly until absorbed each time.", "Continue for 20–25 minutes until rice is creamy and al dente.", "Stir in mushrooms, Parmesan, and a knob of butter. Season and serve."],
  },
  {
    id: 8,
    title: "Honey Garlic Shrimp",
    ingredients: "Shrimp, Honey, Garlic, Soy sauce, Butter, Lemon",
    time: "15 mins", serves: "3",
    ingredientList: ["400g shrimp (peeled, deveined)", "3 tbsp honey", "3 cloves garlic (minced)", "2 tbsp soy sauce", "1 tbsp butter", "1 lemon (juice)"],
    instructions: ["Mix honey, soy sauce, and lemon juice in a bowl.", "Melt butter in a skillet over medium-high heat.", "Add garlic and cook for 30 seconds until fragrant.", "Add shrimp and cook 1–2 minutes per side until pink.", "Pour in the sauce and toss to coat. Cook 1 more minute.", "Garnish with parsley and serve over rice or noodles."],
  },
  {
    id: 9,
    title: "Avocado Toast with Egg",
    ingredients: "Bread, Avocado, Eggs, Chili flakes, Lemon, Salt",
    time: "10 mins", serves: "2",
    ingredientList: ["2 slices sourdough bread", "1 ripe avocado", "2 eggs", "Chili flakes", "½ lemon (juiced)", "Salt & pepper", "Olive oil"],
    instructions: ["Toast the bread until golden and crispy.", "Mash avocado with lemon juice, salt, and pepper.", "Spread avocado mixture evenly over toast.", "Cook eggs your preferred way (poached or fried).", "Place egg on top of avocado toast.", "Sprinkle chili flakes and a drizzle of olive oil to finish."],
  },
  {
    id: 10,
    title: "Beef Tacos",
    ingredients: "Ground beef, Taco shells, Cheddar, Lettuce, Salsa, Sour cream",
    time: "25 mins", serves: "4",
    ingredientList: ["400g ground beef", "8 taco shells", "100g cheddar (shredded)", "Shredded lettuce", "½ cup salsa", "4 tbsp sour cream", "Taco seasoning"],
    instructions: ["Cook ground beef in a pan over medium heat until browned.", "Drain excess fat and add taco seasoning with a splash of water.", "Simmer for 3–4 minutes until mixture thickens.", "Warm taco shells in oven at 180°C for 5 minutes.", "Fill shells with beef mixture and top with cheese.", "Add lettuce, salsa, and sour cream. Serve immediately."],
  },
  {
    id: 11,
    title: "Thai Green Curry",
    ingredients: "Chicken, Green curry paste, Coconut milk, Zucchini, Basil",
    time: "30 mins", serves: "4",
    ingredientList: ["400g chicken (sliced)", "2 tbsp green curry paste", "400ml coconut milk", "1 zucchini (sliced)", "Fresh basil leaves", "1 tbsp fish sauce", "Jasmine rice for serving"],
    instructions: ["Heat oil in a wok and fry curry paste for 1 minute.", "Add chicken and cook until sealed, about 3 minutes.", "Pour in coconut milk and bring to a gentle simmer.", "Add zucchini and fish sauce. Cook 8–10 minutes.", "Stir in fresh basil leaves just before serving.", "Serve hot over steamed jasmine rice."],
  },
  {
    id: 12,
    title: "Classic Caesar Salad",
    ingredients: "Romaine lettuce, Croutons, Parmesan, Caesar dressing, Lemon",
    time: "15 mins", serves: "2",
    ingredientList: ["1 head romaine lettuce", "1 cup croutons", "50g Parmesan (shaved)", "4 tbsp Caesar dressing", "1 lemon (juice)", "Black pepper"],
    instructions: ["Wash and tear romaine lettuce into bite-sized pieces.", "Toss lettuce with Caesar dressing until well coated.", "Add croutons and toss lightly.", "Squeeze fresh lemon juice over the salad.", "Top with shaved Parmesan and freshly cracked black pepper.", "Serve immediately while croutons are crunchy."],
  },
  {
    id: 13, title: "Butter Chicken", ingredients: "Chicken, Tomato sauce, Cream, Garam masala, Ginger, Garlic", time: "40 mins", serves: "4",
    ingredientList: ["500g chicken (cubed)", "200ml tomato sauce", "100ml cream", "1 tsp garam masala", "1 tsp ginger paste", "2 cloves garlic"], instructions: ["Marinate chicken in spices for 20 mins.", "Brown chicken in butter.", "Add tomato sauce and simmer 10 mins.", "Stir in cream and garam masala.", "Cook 5 more minutes.", "Serve with naan or rice."],
  },
  {
    id: 14, title: "Caprese Bruschetta", ingredients: "Baguette, Tomatoes, Mozzarella, Basil, Olive oil, Balsamic", time: "15 mins", serves: "4",
    ingredientList: ["1 baguette (sliced)", "3 tomatoes (diced)", "200g mozzarella", "Fresh basil", "Olive oil", "Balsamic glaze"], instructions: ["Toast baguette slices.", "Mix tomatoes with olive oil and basil.", "Top each slice with mozzarella and tomato mix.", "Drizzle with balsamic glaze.", "Add extra basil leaves.", "Serve immediately."],
  },
  {
    id: 15, title: "Veggie Omelette", ingredients: "Eggs, Bell pepper, Onion, Cheese, Spinach, Butter", time: "10 mins", serves: "1",
    ingredientList: ["3 eggs", "½ bell pepper (diced)", "¼ onion (diced)", "30g cheese", "Handful spinach", "1 tbsp butter"], instructions: ["Whisk eggs with salt and pepper.", "Melt butter in a non-stick pan.", "Sauté onion and pepper 2 mins.", "Add spinach and wilt.", "Pour eggs over vegetables.", "Add cheese, fold omelette and serve."],
  },
  {
    id: 16, title: "Spaghetti Carbonara", ingredients: "Spaghetti, Pancetta, Eggs, Parmesan, Black pepper, Garlic", time: "25 mins", serves: "3",
    ingredientList: ["250g spaghetti", "150g pancetta", "3 egg yolks", "60g Parmesan", "2 cloves garlic", "Black pepper"], instructions: ["Cook spaghetti in salted water.", "Fry pancetta and garlic until crisp.", "Whisk egg yolks with Parmesan.", "Drain pasta, reserve water.", "Off heat, toss pasta with pancetta then egg mix.", "Add pasta water for creaminess. Serve with pepper."],
  },
  {
    id: 17, title: "Chicken Quesadillas", ingredients: "Chicken, Tortillas, Cheese, Bell pepper, Onion, Sour cream", time: "20 mins", serves: "3",
    ingredientList: ["2 chicken breasts (cooked, shredded)", "4 large tortillas", "150g cheese", "1 bell pepper", "½ onion", "Sour cream"], instructions: ["Sauté pepper and onion until soft.", "Mix with shredded chicken.", "Spread cheese on half a tortilla.", "Add chicken mixture and fold tortilla.", "Cook on a dry pan 2–3 mins each side.", "Slice and serve with sour cream."],
  },
  {
    id: 18, title: "Lentil Soup", ingredients: "Red lentils, Tomatoes, Onion, Cumin, Garlic, Lemon", time: "35 mins", serves: "4",
    ingredientList: ["1.5 cups red lentils", "2 tomatoes (chopped)", "1 onion", "1 tsp cumin", "3 cloves garlic", "1 lemon"], instructions: ["Sauté onion and garlic until golden.", "Add cumin and toast 30 seconds.", "Add lentils, tomatoes, and 4 cups water.", "Bring to boil then simmer 20 minutes.", "Blend partially for creamy texture.", "Squeeze lemon on top and serve."],
  },
  {
    id: 19, title: "Pesto Pasta", ingredients: "Pasta, Basil pesto, Cherry tomatoes, Parmesan, Pine nuts", time: "20 mins", serves: "3",
    ingredientList: ["250g pasta", "4 tbsp basil pesto", "200g cherry tomatoes (halved)", "50g Parmesan", "2 tbsp pine nuts", "Olive oil"], instructions: ["Cook pasta in salted water until al dente.", "Toast pine nuts in a dry pan.", "Halve tomatoes. Toss with olive oil and salt.", "Drain pasta and mix with pesto.", "Add tomatoes and pine nuts.", "Serve topped with Parmesan."],
  },
  {
    id: 20, title: "Stuffed Bell Peppers", ingredients: "Bell peppers, Ground beef, Rice, Tomato sauce, Cheese", time: "45 mins", serves: "4",
    ingredientList: ["4 bell peppers", "300g ground beef", "1 cup cooked rice", "200ml tomato sauce", "100g cheese", "Italian seasoning"], instructions: ["Preheat oven to 190°C. Cut tops off peppers and remove seeds.", "Brown beef with seasoning. Mix with rice and half the sauce.", "Fill peppers with mixture. Place in baking dish.", "Pour remaining sauce around peppers.", "Top with cheese and bake 30 minutes.", "Serve hot."],
  },
  {
    id: 21, title: "Greek Salad", ingredients: "Cucumber, Tomatoes, Olives, Feta cheese, Red onion, Olive oil", time: "10 mins", serves: "2",
    ingredientList: ["1 cucumber (chunked)", "3 tomatoes (chunked)", "½ cup olives", "150g feta cheese", "½ red onion", "Olive oil, oregano"], instructions: ["Chop all vegetables into chunky pieces.", "Combine cucumber, tomatoes, and onion in bowl.", "Add olives and crumbled feta.", "Drizzle with olive oil and sprinkle oregano.", "Toss gently to combine.", "Serve immediately or chill 10 minutes."],
  },
  {
    id: 22, title: "Chicken Soup", ingredients: "Chicken, Carrots, Celery, Onion, Noodles, Thyme, Garlic", time: "50 mins", serves: "5",
    ingredientList: ["500g chicken pieces", "2 carrots (sliced)", "2 celery stalks", "1 onion", "100g egg noodles", "1 tsp thyme", "3 cloves garlic"], instructions: ["Simmer chicken in 6 cups water 25 mins. Remove and shred.", "Add carrots, celery, onion, and garlic to broth.", "Simmer 15 minutes until vegetables soften.", "Add noodles and cook 8 minutes.", "Return shredded chicken to pot.", "Season with thyme, salt, pepper and serve."],
  },
  {
    id: 23, title: "Banana Pancakes", ingredients: "Bananas, Eggs, Oats, Cinnamon, Honey, Vanilla", time: "15 mins", serves: "2",
    ingredientList: ["2 ripe bananas", "2 eggs", "½ cup oats", "1 tsp cinnamon", "1 tbsp honey", "1 tsp vanilla extract"], instructions: ["Mash bananas until smooth.", "Mix in eggs, oats, cinnamon, and vanilla.", "Let batter rest 2 minutes.", "Heat non-stick pan over medium heat.", "Pour small rounds and cook 2 mins each side.", "Drizzle with honey and serve warm."],
  },
  {
    id: 24, title: "Tuna Salad Sandwich", ingredients: "Tuna, Mayo, Celery, Lemon, Bread, Lettuce, Mustard", time: "10 mins", serves: "2",
    ingredientList: ["1 can tuna (drained)", "2 tbsp mayo", "1 celery stalk (diced)", "½ lemon", "4 slices bread", "Lettuce leaves", "1 tsp mustard"], instructions: ["Drain tuna and flake into a bowl.", "Mix with mayo, mustard, diced celery.", "Squeeze lemon and mix well. Season with salt and pepper.", "Toast bread if desired.", "Layer lettuce on bread, spoon on tuna mix.", "Top with second slice and cut diagonally to serve."],
  },
  {
    id: 25, title: "Chickpea Curry", ingredients: "Chickpeas, Coconut milk, Tomatoes, Onion, Cumin, Garam masala", time: "30 mins", serves: "4",
    ingredientList: ["2 cans chickpeas", "400ml coconut milk", "2 tomatoes (chopped)", "1 onion", "1 tsp cumin", "1 tsp garam masala", "Olive oil, garlic, ginger"], instructions: ["Sauté onion, garlic, and ginger until soft.", "Add cumin and garam masala. Toast 1 minute.", "Add tomatoes and cook 5 minutes.", "Add chickpeas and coconut milk.", "Simmer 15 minutes until sauce thickens.", "Serve over rice with fresh coriander."],
  },
];

const PER_PAGE = 12;

function RecipeDetailView({ recipe, onBack }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-rose-500/4 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

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
            onClick={() => console.log("Download:", recipe.title)}
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
              {recipe.ingredientList.map((item, i) => (
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
              {recipe.instructions.map((step, i) => (
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


function RecipeCard({ recipe, onClick }) {
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
          onClick={(e) => { e.stopPropagation(); console.log("Download", recipe.title); }}
        >
          <FileDown size={15} />
        </button>
      </div>
      <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-orange-100 transition-colors duration-200">
        {recipe.title}
      </h3>
      <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
        {recipe.ingredients}
      </p>
    </div>
  );
}


function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
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


export default function MyRecipesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  if (selectedRecipe) {
    return <RecipeDetailView recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  const filtered = MOCK_RECIPES.filter((r) => {
    const q = searchQuery.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.ingredients.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const startIdx = (currentPage - 1) * PER_PAGE;
  const currentRecipes = filtered.slice(startIdx, startIdx + PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-rose-500/4 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

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
            {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}{searchQuery ? ` found for "${searchQuery}"` : " saved"}
            {filtered.length > 0 && totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 focus-within:border-orange-500/45 focus-within:bg-white/7 focus-within:shadow-lg focus-within:shadow-orange-500/8 rounded-2xl px-4 py-3.5 mb-8 transition-all duration-200">
          <Search size={16} className="text-white/25 shrink-0" />
          <input
            id="my-recipes-search"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by recipe name"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
              className="text-white/25 hover:text-white/60 transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>
        {currentRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
              <Search size={24} className="text-white/20" />
            </div>
            <p className="text-white/30 font-semibold text-base mb-1">No recipes found</p>
            <p className="text-white/18 text-sm">Try a different name or ingredient</p>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

    </div>
  );
}
