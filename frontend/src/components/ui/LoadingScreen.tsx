export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-t-2 border-brand border-solid rounded-full animate-spin"></div>
        <span className="font-mono text-sm text-zinc-500 uppercase tracking-widest animate-pulse">Cargando Módulo...</span>
      </div>
    </div>
  );
}
