"use client";

import { useState } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import OptionsCard from "./components/OptionsCard";
import PriceCard from "./components/PriceCard";
import Modal from "./components/Modal";

export default function PrintZonePage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-gray-50" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-3xl space-y-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <UploadCard darkMode={darkMode} />
        <OptionsCard darkMode={darkMode} />
        <PriceCard darkMode={darkMode} onOrder={handleOrder} />
      </div>
      {isModalOpen && <Modal darkMode={darkMode} onClose={handleCloseModal} />}
    </div>
  );
}
