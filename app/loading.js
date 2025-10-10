export default function Loading() {
  return (
     <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="relative w-20 h-20">
        <div className="w-20 h-20 rounded-full border-8 border-gray-700"></div>
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-8 border-t-teal-400 border-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-teal-400 text-lg font-semibold">Loading...</p>
    </div>
  );
}
