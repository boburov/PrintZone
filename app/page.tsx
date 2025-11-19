"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import OptionsCard from "./components/OptionsCard";
import PriceCard from "./components/PriceCard";

export default function PrintZonePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pageCount, setPageCount] = useState<number | "">("");
  const [copies, setCopies] = useState<number>(1);
  const [paperSize, setPaperSize] = useState<"A5" | "A4">("A4");
  const [coverType, setCoverType] = useState<"soft" | "hard">("soft");
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const formatMoney = (v: number | null) =>
    !v && v !== 0 ? "0 so'm" : `${v.toLocaleString("ru-RU")} so'm`;

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-gray-50" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-3xl space-y-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <UploadCard
          fileInputRef={fileInputRef}
          fileName={fileName}
          setFileName={setFileName}
          setPageCount={setPageCount}
          darkMode={darkMode}
        />
        <OptionsCard
          pageCount={pageCount}
          copies={copies}
          setCopies={setCopies}
          paperSize={paperSize}
          setPaperSize={setPaperSize}
          coverType={coverType}
          setCoverType={setCoverType}
          darkMode={darkMode}
        />
        <PriceCard
          pageCount={pageCount}
          copies={copies}
          paperSize={paperSize}
          coverType={coverType}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          darkMode={darkMode}
          formatMoney={formatMoney}
        />
      </div>
    </div>
  );
}
