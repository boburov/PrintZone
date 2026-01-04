"use client"
import RightMarketingSection from "./components/RightMarketingSection";
import { useState } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import OptionsCard from "./components/OptionsCard";
import PriceCard from "./components/PriceCard";
import Modal from "./components/Modal";
import Contact from "./components/Contact";
import useStore from './store/store';
import LeftMarketingSection from "./components/LeftMarketingSection"; // Corrected import

export default function PrintZonePage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pageCount } = useStore();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOrder = () => {
    if (pageCount === 0) {
      alert("Iltimos, sahifalar sonini kiriting yoki PDF-fayl yuklang.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,theme(maxWidth.3xl))_1fr] lg:gap-8 ${darkMode ? "bg-gray-900 text-gray-50" : "bg-gray-50 text-gray-900"
        }`}
    >
      <div className="hidden lg:block h-full">
        <LeftMarketingSection darkMode={darkMode} />
      </div>
      <div className="w-full space-y-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <UploadCard darkMode={darkMode} />
        <OptionsCard darkMode={darkMode} />
        <PriceCard darkMode={darkMode} onOrder={handleOrder} />
        <Contact darkMode={darkMode} /> {/* Pass darkMode prop */}
      </div>
      <div className="hidden lg:block h-full">
        <RightMarketingSection darkMode={darkMode} />
      </div>
      {isModalOpen && <Modal darkMode={darkMode} onClose={handleCloseModal} />}
    </div>
  );
}
