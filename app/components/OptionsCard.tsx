import useStore from "../store/store";
import { FileText, Sheet, Book } from "lucide-react"; // Import Lucide icons

export default function OptionsCard({ darkMode }: { darkMode: boolean }) {
  const {
    pageCounts,
    bookCount,
    paperType,
    setPaperType,
    coverType,
    setCoverType,
  } = useStore();

  const totalPageCount = pageCounts.reduce((acc, current) => acc + current, 0);

  return (
    <section className={`rounded-xl shadow-lg p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Book size={20} /> Printing Options
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="flex flex-col">
          <label className="font-medium mb-1 flex items-center gap-2">
            <Book size={16} /> Kitoblar soni
          </label>
          <p className="text-2xl font-extrabold">{bookCount}</p>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 flex items-center gap-2">
            <FileText size={16} /> Umumiy sahifalar soni
          </label>
          <p className="text-2xl font-extrabold">{totalPageCount}</p>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 flex items-center gap-2">
            <Sheet size={16} /> Paper Type
          </label>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setPaperType("A4")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-sm
                ${paperType === "A4"
                  ? "bg-[#FF500B] text-white border-[#FF500B] shadow-md"
                  : darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-50 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
            >
              A4
            </button>
            <button
              onClick={() => setPaperType("A5")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-sm
                ${paperType === "A5"
                  ? "bg-[#FF500B] text-white border-[#FF500B] shadow-md"
                  : darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-50 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
            >
              A5
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1 flex items-center gap-2">
            <Book size={16} /> Cover Type
          </label>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setCoverType("soft")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-sm
                ${coverType === "soft"
                  ? "bg-[#FF500B] text-white border-[#FF500B] shadow-md"
                  : darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-50 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
            >
              Soft
            </button>
            <button
              onClick={() => setCoverType("hard")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 transform hover:scale-105 shadow-sm
                ${coverType === "hard"
                  ? "bg-[#FF500B] text-white border-[#FF500B] shadow-md"
                  : darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-50 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
