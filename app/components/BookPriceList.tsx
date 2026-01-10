"use client";
import useStore from '../store/store';
import { PaperType, CoverType } from '../store/store';
import {
  Book,
  Trash2,
  FileText,
  Copy,
  ChevronDown,
  Printer,
  DollarSign
} from 'lucide-react';

interface BookPriceListProps {
  darkMode: boolean;
}

const paperTypeOptions: PaperType[] = ["A4", "A5"];
const coverTypeOptions: CoverType[] = ["soft", "hard"];

export default function BookPriceList({ darkMode }: BookPriceListProps) {
  const {
    fileNames,
    copies,
    bookPrices,
    isCalculated,
    removeBook,
    setCopies,
    paperTypes,
    coverTypes,
    setPaperType,
    setCoverType,
    pageCounts
  } = useStore();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  if (fileNames.length === 0) return null;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
            <Printer size={28} className="text-[#FF500B]" />
          </div>
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Buyurtmalar
            </h2>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {fileNames.length} ta kitob tayyorlanmoqda
            </p>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-full text-sm font-medium
          ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          Jami: {fileNames.length} ta
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6">
        {fileNames.map((fileName, index) => {
          const isActive = paperTypes[index] && coverTypes[index] && copies[index] > 0;
          const price = bookPrices[index];

          return (
            <div
              key={index}
              className={`group relative rounded-2xl border p-5 md:p-6 transition-all duration-300
                ${darkMode
                  ? "bg-gray-800/70 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-orange-200 hover:shadow-xl"}`}
            >
              {/* Delete button - top right corner */}
              <button
                onClick={() => removeBook(index)}
                className={`absolute -top-3 -right-3 p-2.5 rounded-full shadow-lg transition-all
                  ${darkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-red-900/70 hover:text-red-400"
                    : "bg-white text-gray-500 hover:bg-red-50 hover:text-red-600"}`}
                title="O'chirish"
              >
                <Trash2 size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left - Main Info */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h3 className={`font-bold text-xl md:text-2xl mb-1 line-clamp-2
                      ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                      {fileName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className={`flex items-center gap-1.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <FileText size={16} />
                        <span>{pageCounts[index]} sahifa</span>
                      </div>
                    </div>
                  </div>

                  {/* Controls - Mobile friendly */}
                  <div className="flex flex-wrap gap-4">
                    {/* Paper Type */}
                    <div className="space-y-2 flex-grow min-w-[120px]">
                      <label className={`text-xs md:text-sm font-medium flex items-center gap-1.5
                        ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <FileText size={15} />
                        Qog'oz
                      </label>
                      <div className="flex gap-2">
                        {paperTypeOptions.map(type => (
                          <button
                            key={type}
                            onClick={() => setPaperType(index, type)}
                            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg border transition-all
                              ${paperTypes[index] === type
                                ? "bg-[#FF500B] text-white border-[#FF500B] shadow-md shadow-orange-500/30"
                                : darkMode
                                  ? "border-gray-600 hover:border-gray-500 bg-gray-700/60"
                                  : "border-gray-300 hover:border-gray-400 bg-white"}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cover Type */}
                    <div className="space-y-2 flex-grow min-w-[120px]">
                      <label className={`text-xs md:text-sm font-medium flex items-center gap-1.5
                        ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <Book size={15} />
                        Muqova
                      </label>
                      <div className="flex gap-2">
                        {coverTypeOptions.map(type => (
                          <button
                            key={type}
                            onClick={() => setCoverType(index, type)}
                            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg border transition-all
                              ${coverTypes[index] === type
                                ? "bg-[#FF500B] text-white border-[#FF500B] shadow-md shadow-orange-500/30"
                                : darkMode
                                  ? "border-gray-600 hover:border-gray-500 bg-gray-700/60"
                                  : "border-gray-300 hover:border-gray-400 bg-white"}`}
                          >
                            {type === "soft" ? "Yumshoq" : "Qattiq"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Copies */}
                    <div className="space-y-2 flex-grow min-w-[120px]">
                      <label className={`text-xs md:text-sm font-medium flex items-center gap-1.5
                        ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <Copy size={15} />
                        Nusxa
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={copies[index] || ""}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            setCopies(index, val);
                          }
                        }}
                        className={`w-full py-2.5 px-3 text-center rounded-lg border text-sm font-medium
                          ${darkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                            : "bg-white border-gray-300 focus:border-orange-500"} 
                          focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all`}
                      />
                    </div>
                  </div>
                </div>

                {/* Right - Price Block */}
                <div className={`lg:col-span-7 flex flex-col items-center justify-center rounded-xl p-6 md:p-8
                  ${darkMode ? "bg-gray-900/40" : "bg-gradient-to-br from-orange-50 to-white"} 
                  border ${darkMode ? "border-gray-700" : "border-orange-100"}`}>
                  {isCalculated && price !== undefined ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={20} className="text-[#FF500B]" />
                        <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Umumiy narx
                        </span>
                      </div>
                      <p className="text-4xl md:text-5xl font-black text-[#FF500B] tracking-tight">
                        {formatCurrency(price)}
                      </p>
                      <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        1 dona ≈ {formatCurrency(price / (copies[index] || 1))}
                      </p>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Narx hali hisoblanmadi
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                        Barcha sozlamalarni tanlang
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}