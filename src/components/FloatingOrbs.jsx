export default function FloatingOrbs({ 
  position = "absolute", 
  containerClassName = "" 
}) {
  return (
    <div className={`${position} inset-0 overflow-hidden pointer-events-none ${containerClassName}`}>
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-rose-500/4 blur-[100px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}
