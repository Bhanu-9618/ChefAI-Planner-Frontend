import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  User,
  Mail,
  Lock,
  Weight,
  Ruler,
  Target,
  Pencil,
  X,
  Eye,
  EyeOff,
  Check,
  ChevronLeft,
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";

// ─── Mock user data ───────────────────────────────────────────────────────────
const MOCK_USER = {
  id: 1,
  username: "john_doe",
  email: "john@example.com",
  role: "User",
  weight: 75.5,
  height: 180,
  goal: "Weight Loss",
};

const GOAL_OPTIONS = ["Weight Loss", "Muscle Gain", "Maintenance", "Healthy Eating", "Other"];

// ─── Profile Info Row ─────────────────────────────────────────────────────────
function InfoRow({ icon, label, value, accent = false }) {
  const IconComponent = icon;
  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/6 last:border-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent ? "bg-orange-500/12 border border-orange-500/20" : "bg-white/5 border border-white/10"}`}>
        <IconComponent size={15} className={accent ? "text-orange-400" : "text-white/40"} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [user, setUser] = useState(MOCK_USER);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    password: "",
    weight: user.weight,
    height: user.height,
    goal: user.goal,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      username: form.username,
      email: form.email,
      weight: parseFloat(form.weight),
      height: parseInt(form.height),
      goal: form.goal,
    }));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      username: user.username,
      email: user.email,
      password: "",
      weight: user.weight,
      height: user.height,
      goal: user.goal,
    });
    setEditing(false);
  };

  const fields = [
    { name: "username", label: "Username", type: "text", icon: User, placeholder: "Your username" },
    { name: "email", label: "Email Address", type: "email", icon: Mail, placeholder: "your@email.com" },
    { name: "password", label: "Password", type: showPassword ? "text" : "password", icon: Lock, placeholder: "New password (leave blank to keep current)", isPassword: true },
    { name: "weight", label: "Weight (kg)", type: "number", icon: Weight, placeholder: "e.g. 75.5" },
    { name: "height", label: "Height (cm)", type: "number", icon: Ruler, placeholder: "e.g. 180" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DashboardNavbar />

      {/* Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-orange-500/6 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[350px] h-[350px] rounded-full bg-rose-500/4 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* Back link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-xl shadow-orange-500/25 text-2xl font-black text-white">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{user.username}</h1>
            <p className="text-white/35 text-sm mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Success Banner */}
        {saved && (
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-5 py-3.5 mb-6 animate-in fade-in duration-300">
            <Check size={16} className="text-emerald-400 shrink-0" />
            <p className="text-sm font-semibold text-emerald-300">Profile updated successfully!</p>
          </div>
        )}

        {!editing ? (
          /* ── Profile View ───────────────────────────────────────────────── */
          <div>
            <div className="bg-white/4 border border-white/8 rounded-3xl p-7 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-white/30">Account Info</h2>
              </div>
              <InfoRow icon={User} label="Username" value={user.username} accent />
              <InfoRow icon={Mail} label="Email"    value={user.email} />
            </div>

            <div className="bg-white/4 border border-white/8 rounded-3xl p-7 mb-8">
              <h2 className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">Health & Goal</h2>
              <InfoRow icon={Weight} label="Weight"   value={`${user.weight} kg`} />
              <InfoRow icon={Ruler}  label="Height"   value={`${user.height} cm`} />
              <InfoRow icon={Target} label="Goal"     value={user.goal} accent />
            </div>

            {/* Update Button */}
            <button
              id="open-update-profile-btn"
              onClick={() => setEditing(true)}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Pencil size={16} />
              Update Profile
            </button>
          </div>
        ) : (
          /* ── Edit Form ──────────────────────────────────────────────────── */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-black text-white">Edit Profile</h2>
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 rounded-xl text-white/35 hover:text-white hover:bg-white/8 transition-all"
              >
                <X size={17} />
              </button>
            </div>

            {/* Text fields */}
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={`profile-${field.name}`}
                  className="block text-xs font-bold uppercase tracking-widest text-white/35 mb-2"
                >
                  {field.label}
                </label>
                <div
                  className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3.5 transition-all duration-200 ${
                    focusedField === field.name
                      ? "border-orange-500/55 bg-white/8 shadow-lg shadow-orange-500/8"
                      : "border-white/10 hover:border-white/18"
                  }`}
                >
                  <field.icon
                    size={15}
                    className={`shrink-0 transition-colors ${focusedField === field.name ? "text-orange-400" : "text-white/25"}`}
                  />
                  <input
                    id={`profile-${field.name}`}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    step={field.name === "weight" ? "0.1" : undefined}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
                  />
                  {field.isPassword && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Goal dropdown */}
            <div>
              <label
                htmlFor="profile-goal"
                className="block text-xs font-bold uppercase tracking-widest text-white/35 mb-2"
              >
                Goal
              </label>
              <div
                className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3.5 transition-all duration-200 ${
                  focusedField === "goal"
                    ? "border-orange-500/55 bg-white/8 shadow-lg shadow-orange-500/8"
                    : "border-white/10 hover:border-white/18"
                }`}
              >
                <Target
                  size={15}
                  className={`shrink-0 transition-colors ${focusedField === "goal" ? "text-orange-400" : "text-white/25"}`}
                />
                <select
                  id="profile-goal"
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("goal")}
                  onBlur={() => setFocusedField(null)}
                  className="flex-1 bg-transparent text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  {GOAL_OPTIONS.map((g) => (
                    <option key={g} value={g} className="bg-[#1a1a1a] text-white">
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                id="save-profile-btn"
                className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Check size={16} />
                Save Changes
              </button>
              <button
                type="button"
                id="cancel-profile-btn"
                onClick={handleCancel}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-semibold text-sm rounded-2xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
