import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import authService from "../api/authService";
import InputField from "../components/InputField";
import AuthBackgroundGrid from "../components/AuthBackgroundGrid";
import Logo from "../components/Logo";
import AuthDivider from "../components/AuthDivider";
import Spinner from "../components/Spinner";

export default function SignInPage() {
  const { setTokenFromResponse } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!form.email || !form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    try {
      const response = await authService.login({
        email: form.email,
        password: form.password,
      });

      console.log("Login response:", response);

      if (response.token) {
        setTokenFromResponse(response.token, response);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);

      if (err.response?.status === 401) {
        const message = err.response.data?.message || "Invalid credentials";
        if (message.toLowerCase().includes("email")) {
          setErrors({ email: message });
        } else {
          setApiError(message);
        }
      } else if (err.response?.status === 400) {
        const errorData = err.response.data;
        if (errorData?.errors && typeof errorData.errors === "object") {
          setErrors(errorData.errors);
        } else if (errorData?.message) {
          setApiError(errorData.message);
        } else {
          setApiError("Invalid input. Please check your details.");
        }
      } else if (err.message === "Network Error" || !err.response) {
        setApiError("Cannot connect to server. Please ensure the backend is reachable.");
      } else if (err.response?.status === 500) {
        setApiError("Server error. Please try again later.");
      } else {
        setApiError(err.response?.data?.message || "An error occurred during sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16">
        <AuthBackgroundGrid />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-16">
            <Logo size="lg" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            Welcome{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Back!
            </span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-sm mx-auto leading-relaxed mb-12">
            Your saved recipes are waiting. Sign in and get back to cooking smarter.
          </p>
          <div className="max-w-xs mx-auto bg-white/4 border border-white/8 rounded-2xl p-5 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>
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

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-orange-500/8 blur-[80px] pointer-events-none lg:hidden"></div>
        <div className="w-full max-w-md relative z-10">
          <div className="flex items-center justify-center mb-10 lg:hidden">
            <Logo size="md" />
          </div>
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {apiError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {apiError}
              </div>
            )}
            {fields.map((field) => (
              <InputField
                key={field.name}
                field={field}
                value={form[field.name]}
                error={errors[field.name]}
                isFocused={focusedField === field.name}
                showPassword={showPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            ))}

            <div className="flex justify-end -mt-2">
              <a
                href="#"
                id="forgot-password-link"
                className="text-xs text-white/35 hover:text-orange-400 transition-colors font-medium"
              >
                Forgot your password?
              </a>
            </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                  loading
                    ? "bg-gradient-to-r from-orange-500/70 to-rose-500/70 text-white/70 shadow-orange-500/10 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <Spinner opacity="opacity-25" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
          </form>
          <AuthDivider />
          <p className="text-center text-sm text-white/35">
            New to ChefAI?{" "}
            <Link
              to="/signup"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Create a free account →
            </Link>
          </p>
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
