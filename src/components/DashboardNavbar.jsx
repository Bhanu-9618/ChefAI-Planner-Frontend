import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChefHat, Sparkles, BookmarkCheck, User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/dashboard", label: "Get Recipe", icon: Sparkles, id: "dash-nav-get-recipe" },
    { to: "/dashboard/my-recipes", label: "My Recipes", icon: BookmarkCheck, id: "dash-nav-my-recipes" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2.5 group" id="dash-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/45 group-hover:scale-110 transition-all duration-300">
              <ChefHat size={18} className="text-white" strokeWidth={2.2} />
            </div>
            <span className="text-lg font-black tracking-tight">
              <span className="text-white">Chef</span>
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                id={link.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                    : "text-white/55 hover:text-white hover:bg-white/6"
                }`}
              >
                <link.icon size={15} strokeWidth={2.2} />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative" ref={dropdownRef}>
              <button
                id="dash-profile-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-xl px-3 py-2 transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {user?.initials || user?.name?.slice(0, 2).toUpperCase() || "U"}
                </div>
                <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors max-w-[120px] truncate">
                  {user?.username || user?.name || user?.email || "User"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-white/40 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-white/8">
                    <p className="text-sm font-bold text-white truncate">{user?.username || user?.name || "User"}</p>
                    <p className="text-xs text-white/35 truncate">{user?.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      to="/dashboard/profile"
                      id="dash-my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/6 transition-all duration-150"
                    >
                      <User size={15} className="text-white/40" />
                      My Profile
                    </Link>
                    <button
                      id="dash-logout-btn"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        navigate("/signin");
                      }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150"
                    >
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            id="dash-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-white/8 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive(link.to)
                  ? "bg-orange-500/15 text-orange-400"
                  : "text-white/55 hover:text-white hover:bg-white/6"
              }`}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          ))}
          <hr className="border-white/8 my-1" />
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-xs font-bold text-white">
                {user?.initials || user?.name?.slice(0, 2).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user?.username || user?.name || "User"}</p>
                <p className="text-xs text-white/35">{user?.email}</p>
              </div>
          </div>
          <Link to="/dashboard/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-white/55 hover:text-white">
            <User size={14} /> My Profile
          </Link>
          <button onClick={() => { logout(); navigate("/signin"); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm text-rose-400">
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
