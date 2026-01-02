import useStore from "../store/store";

export default function OptionsCard({ darkMode }: { darkMode: boolean }) {
  const {
    pageCount,
    copies,
    setCopies,
    paperType,
    setPaperType,
    coverType,
    setCoverType,
  } = useStore();

  return (
    <section className={`rounded-xl shadow p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <h2 className="text-lg font-semibold mb-4">Options</h2>
      <div className="grid grid-cols-1 gap-6 ">
        <div>
          <label className="font-medium">Page Count</label>
          <p className="text-2xl font-bold">{pageCount}</p>
        </div>
        <div>
          <label className="font-medium">Copies</label>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setCopies(copies - 1)}
              disabled={copies <= 1}
              className={`w-10 h-12 border rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={copies}
              onChange={(e) => setCopies(parseInt(e.target.value))}
              className={`h-12 flex-1 text-center border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`}
            />
            <button
              onClick={() => setCopies(copies + 1)}
              className={`w-10 h-12 border rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="font-medium">Paper Type</label>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setPaperType("A4")}
              className={`px-4 py-2 rounded-lg border ${paperType === "A4" ? "bg-[#FF500B] text-white" : darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
            >
              A4
            </button>
            <button
              onClick={() => setPaperType("A5")}
              className={`px-4 py-2 rounded-lg border ${paperType === "A5" ? "bg-[#FF500B] text-white" : darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
            >
              A5
            </button>
          </div>
        </div>
        <div>
          <label className="font-medium">Cover Type</label>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setCoverType("soft")}
              className={`px-4 py-2 rounded-lg border ${coverType === "soft" ? "bg-[#FF500B] text-white" : darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
            >
              Soft
            </button>
            <button
              onClick={() => setCoverType("hard")}
              className={`px-4 py-2 rounded-lg border ${coverType === "hard" ? "bg-[#FF500B] text-white" : darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
