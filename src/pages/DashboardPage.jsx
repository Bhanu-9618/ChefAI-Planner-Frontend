import { useState } from "react";
import { Sparkles, ArrowRight, Utensils, ChefHat } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";

// ─── Floating Orbs ────────────────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}

// ─── Get Recipe Section ───────────────────────────────────────────────────────
function GetRecipeSection() {
  const [ingredients, setIngredients] = useState("");
  const [generating, setGenerating] = useState(false);

  const hasInput = ingredients.trim().length > 0;

  const handleGenerate = () => {
    if (!hasInput) return;
    setGenerating(true);
    // recipe generation logic goes here
    setTimeout(() => setGenerating(false), 2000); // mock delay
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Section Label */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm font-semibold text-orange-300 mb-5">
          <Sparkles size={14} className="animate-pulse" />
          AI Recipe Generator
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          What's in your{" "}
          <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
            kitchen?
          </span>
        </h1>
        <p className="text-white/40 text-base font-light max-w-md mx-auto">
          Enter your ingredients below and ChefAI will craft a perfect recipe just for you.
        </p>
      </div>

      {/* Generator Card */}
      <div className="bg-white/4 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        {/* Input Label */}
        <label
          htmlFor="dash-ingredient-input"
          className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-3"
        >
          Your Ingredients
        </label>

        {/* Ingredient Input */}
        <div
          className={`flex items-start gap-2.5 bg-white/6 border rounded-2xl px-4 py-4 transition-all duration-200 ${
            ingredients.trim().length > 0
              ? "border-orange-500/50 bg-white/8 shadow-lg shadow-orange-500/8"
              : "border-white/10 focus-within:border-orange-500/40 focus-within:bg-white/8"
          }`}
        >
          <Utensils size={16} className="text-white/25 shrink-0 mt-0.5" />
          <textarea
            id="dash-ingredient-input"
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Chicken, Garlic, Tomatoes, Spinach, Olive oil..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none resize-none leading-relaxed"
          />
        </div>

        <p className="text-xs text-white/20 mt-2 mb-6">
          Separate ingredients with commas or new lines.
        </p>

        {/* Generate Button */}
        <button
          id="dash-generate-btn"
          onClick={handleGenerate}
          disabled={!hasInput || generating}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
            !hasInput
              ? "bg-white/5 border border-white/8 text-white/25 cursor-not-allowed"
              : generating
              ? "bg-gradient-to-r from-orange-500/70 to-rose-500/70 text-white/70 cursor-wait"
              : "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {generating ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Generating your recipe...
            </>
          ) : (
            <>
              <Sparkles size={19} />
              Generate My Recipe
              <ArrowRight size={19} />
            </>
          )}
        </button>
      </div>

      {/* Recipe Output Placeholder */}
      <div className="mt-6 bg-white/3 border border-dashed border-white/10 rounded-3xl p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400/20 to-rose-500/20 border border-orange-500/15 flex items-center justify-center mx-auto mb-4">
          <ChefHat size={24} className="text-orange-400/50" strokeWidth={1.5} />
        </div>
        <p className="text-white/20 text-sm font-medium mb-1">Your recipe will appear here</p>
        <p className="text-white/12 text-xs">Add ingredients and hit Generate</p>
        <div className="mt-6 space-y-2 text-left max-w-md mx-auto">
          {[80, 60, 72, 50, 65].map((w, i) => (
            <div key={i} className="h-2.5 bg-white/5 rounded-full" style={{ width: `${w}%` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="relative pt-24 pb-20 px-6 min-h-screen flex items-start justify-center">
        <FloatingOrbs />
        <div className="relative z-10 w-full max-w-5xl pt-8">
          <GetRecipeSection />
        </div>
      </main>
    </div>
  );
}
