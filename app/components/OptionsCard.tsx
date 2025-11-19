interface OptionsCardProps {
  pageCount: number | "";
  copies: number;
  setCopies: React.Dispatch<React.SetStateAction<number>>;
  paperSize: "A5" | "A4";
  setPaperSize: React.Dispatch<React.SetStateAction<"A5" | "A4">>;
  coverType: "soft" | "hard";
  setCoverType: React.Dispatch<React.SetStateAction<"soft" | "hard">>;
  darkMode: boolean;
}

export default function OptionsCard({ pageCount, copies, setCopies, paperSize, setPaperSize, coverType, setCoverType, darkMode }: OptionsCardProps) {
  return (
    <section className={`rounded-xl shadow p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <h2 className="text-lg font-semibold mb-4">Options</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="font-medium">Page Count</label>
          <input readOnly value={pageCount === "" ? "Auto-filled" : pageCount} className={`mt-2 w-full rounded-lg p-3 border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`} />
        </div>
        <div>
          <label className="font-medium">Copies</label>
          <div className="mt-2 flex gap-2">
            <button onClick={() => setCopies((c) => Math.max(1, c - 1))} className={`w-10 h-12 border rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`}>-</button>
            <input type="number" min={1} value={copies} onChange={(e) => setCopies(Math.max(1, Number(e.target.value)))} className={`h-12 flex-1 text-center border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`} />
            <button onClick={() => setCopies((c) => c + 1)} className={`w-10 h-12 border rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 text-gray-50" : "bg-white border-gray-300 text-gray-900"}`}>+</button>
          </div>
        </div>
      </div>
    </section>
  );
}
