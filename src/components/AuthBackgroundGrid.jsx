export default function AuthBackgroundGrid() {
  return (
    <>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-rose-500/8 blur-[100px] animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      ></div>
    </>
  );
}
