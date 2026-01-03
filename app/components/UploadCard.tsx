"use client"
import { useRef, useState } from "react"; // Import useState
import { UploadCardProps } from "../types/stypes";
import axios from "axios";
import useStore from "../store/store";
import { Upload, FileText, Loader2 } from "lucide-react"; // Import Lucide icons

export default function UploadCard({ darkMode }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null); // Specify ref type
  const { setFile, setFileName, setPageCount, fileName } = useStore();
  const [isUploading, setIsUploading] = useState(false); // New loading state

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => { // Specify event type
    const file = e.target.files?.[0]; // Use optional chaining

    if (!file) return;

    setIsUploading(true); // Start loading

    setFile(file);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/pdf-pages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPageCount(response.data.pageCount);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsUploading(false); // End loading
    }
  };

  return (
    <section className={`rounded-xl shadow p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <p className="text-2xl font-bold">Premium Printing</p>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Upload → Auto detect → Calculate</p>

      <div className={`mt-5 flex flex-col items-center gap-4 border-2 border-dashed rounded-xl px-6 py-8 w-full ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
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
          className={`rounded-lg bg-[#FF500B] hover:bg-[#e44907] transition px-4 py-2 font-bold text-white cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? "Yuklanmoqda..." : "Faylni Tanlang"}
        </label>
        <span className={`text-sm flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {fileName ? (
            <>
              <FileText size={16} /> {fileName}
            </>
          ) : (
            "Fayl tanlanmagan" // Changed "No file selected" to Uzbek
          )}
        </span>
        <input
          onChange={handleChange}
          type="file"
          id="file"
          ref={inputRef}
          accept="application/pdf"
          className="hidden"
          disabled={isUploading} // Disable input during upload
        />
      </div>
    </section>
  );
}
