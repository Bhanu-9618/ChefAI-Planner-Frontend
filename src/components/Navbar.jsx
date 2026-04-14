import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChefHat, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                <ChefHat size={20} className="text-white" strokeWidth={2.2} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d0d0d] animate-pulse"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Chef</span>
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              id="nav-home"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#features"
              id="nav-features"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#how-it-works"
              id="nav-how"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              id="nav-signin"
              className="px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-all duration-200 hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              id="nav-signup"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl hover:from-orange-400 hover:to-rose-400 transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          <a href="#home" className="text-sm font-medium text-white/70 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>How It Works</a>
          <hr className="border-white/10" />
          <Link to="/signin" className="text-sm font-semibold text-white/80 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-center text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl" onClick={() => setMenuOpen(false)}>Sign Up Free</Link>
        </div>
      </div>
    </nav>
  );
}
