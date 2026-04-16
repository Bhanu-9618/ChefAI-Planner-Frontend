import { ChefHat } from "lucide-react";

export default function Logo({ size = "md", withText = true, className = "" }) {
  const isLg = size === "lg";
  const isSm = size === "sm";

  const boxSize = isLg ? "w-12 h-12" : isSm ? "w-8 h-8" : "w-10 h-10";
  const rounded = isSm ? "rounded-lg" : isLg ? "rounded-2xl" : "rounded-xl";
  const iconSize = isLg ? 24 : isSm ? 16 : 20;
  const stroke = isSm ? 2.2 : 2;
  const shadow = isSm ? "shadow-md" : isLg ? "shadow-xl" : "shadow-lg";
  
  const textSize = isLg ? "text-2xl font-black" : isSm ? "text-base font-bold" : "text-xl font-black";

  return (
    <div className={`flex items-center gap-${isSm ? '2' : isLg ? '3' : '2.5'} ${className}`}>
      <div className={`${boxSize} ${rounded} bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-orange-500/30 ${shadow}`}>
        <ChefHat size={iconSize} className="text-white" strokeWidth={stroke} />
      </div>
      {withText && (
        <span className={`${textSize} text-white tracking-tight`}>
          Chef<span className="text-orange-400">AI</span>
        </span>
      )}
    </div>
  );
}
