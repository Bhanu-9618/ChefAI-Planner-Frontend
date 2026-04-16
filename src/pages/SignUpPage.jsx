import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import authService from "../api/authService";
import InputField from "../components/InputField";
import AuthBackgroundGrid from "../components/AuthBackgroundGrid";
import Logo from "../components/Logo";
import AuthDivider from "../components/AuthDivider";
import Spinner from "../components/Spinner";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!form.username || !form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (form.username.length > 100) {
      newErrors.username = "Username must not exceed 100 characters";
    }

    if (!form.email || !form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
    try {
      const response = await authService.register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      console.log("Registration response:", response);

      if (response.id || response) {
        navigate("/signin");
      }
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response?.data);
      
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        
        if (errorData?.message) {
          const message = errorData.message.toLowerCase();
          if (message.includes("email")) {
            setErrors({ email: errorData.message });
          } else if (message.includes("username")) {
            setErrors({ username: errorData.message });
          } else {
            setApiError(errorData.message);
          }
        } else if (errorData?.errors && typeof errorData.errors === "object") {
          setErrors(errorData.errors);
        } else if (typeof errorData === "string") {
          setApiError(errorData);
        } else {
          setApiError("Invalid input. Please check your details.");
        }
      } else if (err.message === "Network Error" || !err.response) {
        setApiError("Cannot connect to server. Make sure the backend is running at http://localhost:5258");
      } else if (err.response?.status === 500) {
        setApiError("Server error. Please try again later.");
      } else {
        setApiError(err.response?.data?.message || "An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "e.g. chef_mario",
      icon: User,
    },
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
      placeholder: "Min. 8 characters",
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
            Your Kitchen,{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Smarter
            </span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-sm mx-auto leading-relaxed mb-12">
            Type in your ingredients, get a perfect recipe, save it or download as a PDF — all in one place.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            {[
              { emoji: "🥘", text: "Input ingredients, get instant recipes" },
              { emoji: "🔖", text: "Save your favourite recipes" },
              { emoji: "📄", text: "Download any recipe as PDF" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-left"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm text-white/60 font-medium">{item.text}</span>
              </div>
            ))}
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
              Create your account
            </h1>
            <p className="text-white/40 text-sm font-light">
              Already have an account?{" "}
              <Link
                to="/signin"
                id="signup-to-signin-link"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

            {apiError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                <p className="text-sm text-red-300">{apiError}</p>
              </div>
            )}

            {form.password.length > 0 && (
              <div className="flex gap-1.5 -mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      form.password.length >= level * 2
                        ? level <= 1
                          ? "bg-rose-500"
                          : level <= 2
                          ? "bg-amber-400"
                          : level <= 3
                          ? "bg-yellow-300"
                          : "bg-emerald-400"
                        : "bg-white/10"
                    }`}
                  ></div>
                ))}
                <span className="text-xs text-white/30 ml-1 shrink-0">
                  {form.password.length < 4
                    ? "Weak"
                    : form.password.length < 6
                    ? "Fair"
                    : form.password.length < 8
                    ? "Good"
                    : "Strong"}
                </span>
              </div>
            )}


            <p className="text-xs text-white/25 leading-relaxed -mt-1">
              By signing up, you agree to use ChefAI to generate, save, and download your recipes.
            </p>

              <button
                type="submit"
                disabled={loading}
                className={`mt-1 w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                  loading
                    ? "bg-gradient-to-r from-orange-500/70 to-rose-500/70 text-white/70 shadow-orange-500/10 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <Spinner opacity="opacity-70" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
          </form>

          <AuthDivider />

          <p className="text-center text-sm text-white/35">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Sign in here →
            </Link>
          </p>

          <div className="mt-8 text-center">
            <Link
              to="/"
              id="signup-back-home"
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
