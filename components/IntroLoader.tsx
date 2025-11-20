export default function IntroLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141414]">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-t-red-600"></div>
      <p className="mt-4 text-sm font-medium text-gray-400 tracking-widest uppercase">CineScope</p>
    </div>
  );
}
