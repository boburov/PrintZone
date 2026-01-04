import { useRef, useState } from "react";
import { UploadCardProps } from "../types/stypes";
// import axios from "axios"; // axios is no longer needed in this component
import useStore from "../store/store";
import { Upload, FileText, Loader2 } from "lucide-react"; // Corrected import
import { PDFDocument } from "pdf-lib";

export default function UploadCard({ darkMode }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setFile, setFileName, setPageCount, fileName, pageCount } = useStore(); // Get pageCount from store
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsUploading(true);

    setFile(file);
    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPageCount(pdfDoc.getPageCount());
    } catch (error) {
      console.error("Error processing PDF client-side:", error);
      setPageCount(0); // Reset page count or handle error appropriately
      // Optionally, show an error message to the user
    } finally {
      setIsUploading(false);
    }
  };

  const handlePageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setPageCount(value);
    } else if (e.target.value === '') {
      setPageCount(0); // Allow clearing the input
    }
  };

  return (
    <section className={`rounded-xl shadow-lg p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <p className="text-2xl font-bold mb-1">Premium Printing</p>
      <p className={`text-sm font-medium mb-5 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Yuklang → Avtomatik aniqlash → Hisoblash</p>

      <div className={`mt-5 flex flex-col items-center gap-4 border-2 border-dashed rounded-xl px-6 py-8 w-full transition-colors duration-200 ${darkMode ? "border-gray-600 hover:bg-gray-700/50" : "border-gray-300 hover:bg-gray-50"}`}>
        {isUploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-[#FF500B]" />
        ) : (
          <Upload className={`h-8 w-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
        )}
        <p className="text-lg font-semibold">
          {`Chiqarilishi kerak bo'lgan faylni tanlang`}
        </p>
        <label
          htmlFor="file"
          className={`rounded-lg bg-[#FF500B] shadow-md hover:bg-[#e44907] transition-all duration-200 px-4 py-2 font-bold text-white cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? "Yuklanmoqda..." : "Faylni Tanlang"}
        </label>
        <span className={`text-sm flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {fileName ? (
            <>
              <FileText size={16} /> {fileName}
            </>
          ) : (
            "Fayl tanlanmagan"
          )}
        </span>
        <input
          onChange={handleChange}
          type="file"
          id="file"
          ref={inputRef}
          accept="application/pdf"
          className="hidden"
          disabled={isUploading}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="page-count" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Sahifalar soni
        </label>
        <input
          type="number"
          id="page-count"
          value={pageCount === 0 ? '' : pageCount}
          onChange={handlePageCountChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF500B] focus:ring-[#FF500B] sm:text-sm ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
          placeholder="Sahifalar sonini kiriting"
          min="0"
          disabled={isUploading}
        />
      </div>
    </section>
  );
}
