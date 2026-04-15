import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔌 Replace with: const res = await api.post("/auth/login", form); login(res.data.user);
    login({ email: form.email });
    navigate("/dashboard");
  };

  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      icon: Mail,
    },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      icon: Lock,
      isPassword: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* ── Left Panel (decorative) ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16">
        {/* Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse pointer-events-none"></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-rose-500/8 blur-[100px] animate-pulse pointer-events-none"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-xl shadow-orange-500/30">
              <ChefHat size={24} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Chef<span className="text-orange-400">AI</span>
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            Welcome{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Back!
            </span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-sm mx-auto leading-relaxed mb-12">
            Your saved recipes are waiting. Sign in and get back to cooking smarter.
          </p>

          {/* Decorative recipe card preview */}
          <div className="max-w-xs mx-auto bg-white/4 border border-white/8 rounded-2xl p-5 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
                <ChefHat size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                Saved Recipe
              </span>
            </div>
            <p className="text-white font-bold text-base mb-1">Garlic Butter Chicken</p>
            <p className="text-white/35 text-xs leading-relaxed mb-3">
              Chicken breast · Garlic · Butter · Lemon · Herbs
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-orange-500/15 text-orange-300 border border-orange-500/20 rounded-full px-2.5 py-1">
                30 mins
              </span>
              <span className="text-xs bg-white/5 text-white/40 border border-white/10 rounded-full px-2.5 py-1">
                4 servings
              </span>
              <span className="ml-auto text-xs text-white/25 flex items-center gap-1">
                📄 PDF ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ───────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative">
        {/* Mobile orb */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-orange-500/8 blur-[80px] pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ChefHat size={20} className="text-white" strokeWidth={2.2} />
            </div>
            <span className="text-xl font-black text-white">
              Chef<span className="text-orange-400">AI</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Sign in to ChefAI
            </h1>
            <p className="text-white/40 text-sm font-light">
              Don't have an account?{" "}
              <Link
                to="/signup"
                id="signin-to-signup-link"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2"
                >
                  {field.label}
                </label>
                <div
                  className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3.5 transition-all duration-200 ${
                    focusedField === field.name
                      ? "border-orange-500/60 bg-white/8 shadow-lg shadow-orange-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <field.icon
                    size={16}
                    className={`shrink-0 transition-colors duration-200 ${
                      focusedField === field.name ? "text-orange-400" : "text-white/25"
                    }`}
                  />
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    required
                    autoComplete={field.name === "password" ? "current-password" : "email"}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
                  />
                  {field.isPassword && (
                    <button
                      type="button"
                      id="toggle-signin-password"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <a
                href="#"
                id="forgot-password-link"
                className="text-xs text-white/35 hover:text-orange-400 transition-colors font-medium"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="signin-submit-btn"
              className="mt-1 w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/45 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles size={18} />
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/8"></div>
            <span className="text-xs text-white/25 font-medium">or</span>
            <div className="flex-1 h-px bg-white/8"></div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-white/35">
            New to ChefAI?{" "}
            <Link
              to="/signup"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Create a free account →
            </Link>
          </p>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              id="signin-back-home"
              className="text-xs text-white/20 hover:text-white/40 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
