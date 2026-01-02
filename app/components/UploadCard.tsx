import { useRef } from "react";
import { UploadCardProps } from "../types/stypes";
import axios from "axios";
import useStore from "../store/store";

export default function UploadCard({ darkMode }: UploadCardProps) {
  const inputRef = useRef(null);
  const { setFile, setFileName, setPageCount, fileName } = useStore();

  const handleChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

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
    }
  };

  return (
    <section className={`rounded-xl shadow p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <p className="text-2xl font-bold">Premium Printing</p>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Upload → Auto detect → Calculate</p>

      <div className={`mt-5 flex flex-col items-center gap-4 border-2 border-dashed rounded-xl px-6 py-8 w-full ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
        <p className="text-lg font-semibold">{`Chiqarilishi kerak bo'lgan faylni tanlang`}</p>
        <label htmlFor="file" className="rounded-lg bg-[#FF500B] hover:bg-[#e44907] transition px-4 py-2 font-bold text-white">
          Faylni Tanlang
        </label>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {fileName || "No file selected"}
        </span>
        <input onChange={handleChange} type="file" id="file" ref={inputRef} accept="application/pdf" className="hidden" />
      </div>
    </section>
  );
}
