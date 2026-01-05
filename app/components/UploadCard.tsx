import { useRef, useState } from "react";
import { UploadCardProps } from "../types/stypes";
import useStore from "../store/store";
import { Upload, FileText, Loader2, X, Plus, Book } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function UploadCard({ darkMode }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFile, addManualBook, removeBook, fileNames, copies, setCopies } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const [manualPageCount, setManualPageCount] = useState<number | string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        addFile(file, pdfDoc.getPageCount());
      } catch (error) {
        console.error("Error processing PDF client-side:", error);
        // Optionally, show an error message to the user
      }
    }

    setIsUploading(false);
  };

  const handleAddManualBook = () => {
    const pageCount = Number(manualPageCount);
    if (pageCount > 0) {
      addManualBook(pageCount);
      setManualPageCount('');
    }
  };

  const handleRemoveBook = (index: number) => {
    removeBook(index);
  };

  const handleCopiesChange = (index: number, value: string) => {
    const numCopies = parseInt(value, 10);
    if (!isNaN(numCopies) && numCopies > 0) {
      setCopies(index, numCopies);
    } else if (value === '') {
      setCopies(index, 1);
    }
  };


  return (
    <section className={`rounded-xl shadow-lg p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <p className="text-2xl font-bold mb-1">Premium Printing</p>
      <p className={`text-sm font-medium mb-5 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Fayl yuklang yoki qo'lda ma'lumot kiriting</p>

      {/* Manual Add */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={manualPageCount}
          onChange={(e) => setManualPageCount(e.target.value)}
          placeholder="Sahifalar soni"
          className={`flex-grow mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF500B] focus:ring-[#FF500B] sm:text-sm ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
          min="1"
        />
        <button
          onClick={handleAddManualBook}
          className={`rounded-lg bg-gray-600 shadow-md hover:bg-gray-500 transition-all duration-200 px-4 py-2 font-bold text-white flex items-center gap-2 ${!manualPageCount ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!manualPageCount}
        >
          <Plus size={16} /> Qo'shish
        </button>
      </div>


      {/* File Upload */}
      <div className={`flex flex-col items-center gap-4 border-2 border-dashed rounded-xl px-6 py-8 w-full transition-colors duration-200 ${darkMode ? "border-gray-600 hover:bg-gray-700/50" : "border-gray-300 hover:bg-gray-50"}`}>
        {isUploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-[#FF500B]" />
        ) : (
          <Upload className={`h-8 w-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
        )}
        <p className="text-lg font-semibold">
          {`Chiqarilishi kerak bo'lgan fayllarni tanlang`}
        </p>
        <label
          htmlFor="file"
          className={`rounded-lg bg-[#FF500B] shadow-md hover:bg-[#e44907] transition-all duration-200 px-4 py-2 font-bold text-white cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? "Yuklanmoqda..." : "Fayllarni Tanlang"}
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          id="file"
          ref={inputRef}
          accept="application/pdf"
          className="hidden"
          multiple
          disabled={isUploading}
        />
      </div>

      {/* File List */}
      <div className="mt-4 space-y-2">
        {fileNames.length > 0 ? (
          fileNames.map((fileName, index) => (
            <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="flex items-center gap-2">
                {fileName.startsWith("Manual") ? <Book size={16} /> : <FileText size={16} />}
                <span className="text-sm">{fileName}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={copies[index]}
                  onChange={(e) => handleCopiesChange(index, e.target.value)}
                  className={`w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-[#FF500B] focus:ring-[#FF500B] sm:text-sm ${darkMode ? "bg-gray-600 text-white border-gray-500" : "bg-white text-gray-900"}`}
                  min="1"
                />
                <button onClick={() => handleRemoveBook(index)} className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}>
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Fayllar yoki kitoblar qo'shilmagan</p>
        )}
      </div>
    </section>
  );
}
