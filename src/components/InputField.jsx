import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  field,
  value,
  error,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  showPassword,
  onTogglePassword,
}) {
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2"
      >
        {field.label}
      </label>
      <div
        className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3.5 transition-all duration-200 ${
          isFocused
            ? "border-orange-500/60 bg-white/8 shadow-lg shadow-orange-500/10"
            : error
            ? "border-red-500/50 bg-red-500/5"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <field.icon
          size={16}
          className={`shrink-0 transition-colors duration-200 ${
            isFocused
              ? "text-orange-400"
              : error
              ? "text-red-400"
              : "text-white/25"
          }`}
        />
        <input
          id={field.name}
          name={field.name}
          type={field.isPassword && showPassword ? "text" : field.type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={field.placeholder}
          required={field.required !== false} // Default to true unless explicitly requested
          autoComplete={
            field.isPassword
              ? field.name === "password" && !field.isSignup ? "current-password" : "new-password"
              : field.name
          }
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
        />
        {field.isPassword && (
          <button
            type="button"
            id={`toggle-${field.name}-visibility`}
            onClick={onTogglePassword}
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
