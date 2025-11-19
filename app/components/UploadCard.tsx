import React from "react";

interface UploadCardProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setPageCount: React.Dispatch<React.SetStateAction<number | "">>;
  darkMode: boolean;
}

export default function UploadCard({ fileInputRef, fileName, setFileName, setPageCount, darkMode }: UploadCardProps) {
  const handleBrowseClick = () => fileInputRef.current?.click();

  const readFileAsArrayBuffer = (file: File) =>
    new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

      const buffer = await readFileAsArrayBuffer(f);
      const loadingTask = pdfjsLib.getDocument(new Uint8Array(buffer));
      const pdf = await loadingTask.promise;
      setPageCount(pdf.numPages);
    } catch (err) {
      console.error(err);
      alert("PDF o‘qib bo‘lmadi.");
      setPageCount("");
    }
  };

  return (
    <section className={`rounded-xl shadow p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <p className="text-2xl font-bold">Premium Printing</p>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Upload → Auto detect → Calculate</p>

      <div className={`mt-5 flex flex-col items-center gap-4 border-2 border-dashed rounded-xl px-6 py-8 w-full ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
        <p className="text-lg font-semibold">Upload PDF</p>
        <button onClick={handleBrowseClick} className="rounded-lg bg-[#FF500B] hover:bg-[#e44907] transition px-4 py-2 font-bold text-white">
          Choose File
        </button>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {fileName || "No file selected"}
        </span>
        <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
      </div>
    </section>
  );
}
