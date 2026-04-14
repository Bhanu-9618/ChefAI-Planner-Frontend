import { Link } from "react-router-dom";
import {
  Sparkles,
  ChefHat,
  BookmarkCheck,
  FileDown,
  ArrowRight,
  Utensils,
  Star,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

// ─── Floating Orbs Background ────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px] animate-pulse"></div>
      <div
        className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-500/6 blur-[100px] animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-[-5%] right-[20%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[80px] animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>
    </div>
  );
}

// ─── Image Placeholder ────────────────────────────────────────────────────────
function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`relative bg-white/3 border border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-rose-500/5"></div>
      <div className="relative z-10 flex flex-col items-center gap-2 text-white/20">
        <div className="w-12 h-12 rounded-xl border-2 border-dashed border-white/15 flex items-center justify-center">
          <BookOpen size={20} />
        </div>
        <span className="text-xs font-medium tracking-wide">{label}</span>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6"
    >
      <FloatingOrbs />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-orange-300 mb-8 backdrop-blur-sm">
          <Sparkles size={14} className="animate-pulse" />
          AI-Powered Recipe Generator
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Got Ingredients?</span>
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
              Get a Recipe.
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M2 8 Q75 2 150 8 Q225 14 298 8"
                stroke="url(#underline)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="underline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed font-light">
          Tell ChefAI what ingredients you have. It generates a perfect recipe
          instantly — then save it or download it as a PDF.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/signup"
            id="hero-signup-btn"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-base rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
          >
            <Sparkles size={18} />
            Try It Free
            <ArrowRight size={18} />
          </Link>
          <a
            href="#how-it-works"
            id="hero-learn-btn"
            className="px-8 py-4 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/25 text-white font-semibold text-base rounded-2xl transition-all duration-300"
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
const features = [
  {
    icon: Utensils,
    color: "from-orange-400 to-amber-500",
    glow: "shadow-orange-500/20",
    title: "Input Your Ingredients",
    desc: "Type in whatever ingredients you have on hand. ChefAI reads them and instantly generates a complete, delicious recipe built around exactly what you've got.",
  },
  {
    icon: BookmarkCheck,
    color: "from-rose-400 to-pink-500",
    glow: "shadow-rose-500/20",
    title: "Save Your Recipe",
    desc: "Found a recipe you love? Hit save and it's stored in your account. Come back to it anytime — your saved recipes are always just a click away.",
  },
  {
    icon: FileDown,
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/20",
    title: "Download as PDF",
    desc: "Want to keep a copy offline or print it out? Download any recipe as a clean, well-formatted PDF in one click. Perfect for the kitchen counter.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">
            What ChefAI Does
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Three Simple{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Things
            </span>
            . Done Well.
          </h2>
          <p className="text-white/45 text-lg max-w-lg mx-auto font-light">
            No bloat, no complexity. ChefAI does exactly what you need — nothing more.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white/3 border border-white/8 rounded-2xl p-7 hover:bg-white/6 hover:border-white/15 transition-all duration-300 overflow-hidden text-center"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/5 via-transparent to-rose-500/5 pointer-events-none rounded-2xl"></div>

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg ${f.glow} group-hover:scale-110 transition-transform duration-300 mx-auto`}
              >
                <f.icon size={24} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Enter Your Ingredients",
    desc: "Type in the ingredients you have — chicken, rice, garlic, whatever. No need to be exact, just list what's available.",
    color: "from-orange-400 to-amber-400",
  },
  {
    num: "02",
    title: "Get Your Recipe",
    desc: "ChefAI instantly generates a full recipe based on your ingredients — with a clear ingredient list and step-by-step instructions.",
    color: "from-rose-400 to-pink-400",
  },
  {
    num: "03",
    title: "Save or Download",
    desc: "Happy with the recipe? Save it to your account for later, or download it as a PDF to keep offline or print for the kitchen.",
    color: "from-emerald-400 to-teal-400",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 px-6 overflow-hidden">

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Ready in{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              3 Steps
            </span>
          </h2>
          <p className="text-white/45 text-lg max-w-md mx-auto font-light">
            From empty fridge to a full recipe in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="shrink-0">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.num}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-bold text-lg mb-1.5">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* App Screenshot */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <img
              src="/image/img 1.jpg"
              alt="ChefAI app screenshot showing how it works"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Sarah M.",
    role: "Home Cook",
    avatar: "S",
    color: "from-orange-400 to-rose-400",
    quote:
      "I typed in leftover chicken and a few veggies — ChefAI gave me a full recipe in seconds. Downloaded the PDF and cooked it straight from my phone.",
    stars: 5,
  },
  {
    name: "James K.",
    role: "Student",
    avatar: "J",
    color: "from-emerald-400 to-teal-400",
    quote:
      "Super simple. I dump in whatever's in my fridge, get a recipe, save the ones I like. That's all I needed and ChefAI nails it.",
    stars: 5,
  },
  {
    name: "Priya D.",
    role: "Busy Professional",
    avatar: "P",
    color: "from-blue-400 to-cyan-400",
    quote:
      "The PDF download is so useful. I print my saved recipes on Sunday and plan the whole week. ChefAI made meal planning actually enjoyable.",
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Real People,{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Real Recipes
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:bg-white/5 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5 font-light italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/35 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="cta" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        <div className="relative bg-gradient-to-br from-orange-500/15 via-rose-500/10 to-transparent border border-orange-500/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-orange-500/15 blur-[60px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/30">
              <ChefHat size={28} className="text-white" strokeWidth={2} />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Start Cooking{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                Smarter
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto mb-8 font-light">
              Sign up free and turn your ingredients into a great recipe right now.
              No subscriptions, no hidden fees.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
              {["Free to use", "No credit card", "Save unlimited recipes", "PDF download"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-white/50">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    {item}
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/signup"
                id="cta-signup-btn"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-base rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
              >
                <Sparkles size={18} />
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/signin"
                id="cta-signin-btn"
                className="px-8 py-4 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/25 text-white font-semibold text-base rounded-2xl transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/8 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
            <ChefHat size={16} className="text-white" strokeWidth={2.2} />
          </div>
          <span className="font-bold text-white">
            Chef<span className="text-orange-400">AI</span>
          </span>
        </div>

        <p className="text-xs text-white/25">© 2026 ChefAI. Made with ❤️ for food lovers.</p>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
