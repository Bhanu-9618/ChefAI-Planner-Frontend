export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-white/8"></div>
      <span className="text-xs text-white/25 font-medium">or</span>
      <div className="flex-1 h-px bg-white/8"></div>
    </div>
  );
}
