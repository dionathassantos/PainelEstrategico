export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#04695E] bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#0DBAAD] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#04695E] font-medium">Carregando...</p>
      </div>
    </div>
  )
}
