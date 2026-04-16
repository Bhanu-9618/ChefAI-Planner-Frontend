import { Search } from "lucide-react";

export default function StateFeedbackBox({ 
  // eslint-disable-next-line no-unused-vars
  icon: Icon = Search, 
  title = "Processing...", 
  subtitle = "", 
  isSpinning = false,
  iconClassName = "text-white/20"
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
        <Icon size={24} className={`${iconClassName} ${isSpinning ? "animate-spin" : ""}`} />
      </div>
      <p className="text-white/30 font-semibold text-base mb-1">{title}</p>
      {subtitle && <p className="text-white/18 text-sm">{subtitle}</p>}
    </div>
  );
}
