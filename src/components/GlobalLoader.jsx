export default  function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
    </div>
  );
}