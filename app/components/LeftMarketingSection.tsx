import React from 'react';
import { Percent } from 'lucide-react'; // Import Percent icon

interface MarketingSectionProps {
  darkMode: boolean;
}

const LeftMarketingSection: React.FC<MarketingSectionProps> = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg h-full flex flex-col justify-between ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 mb-3">
          <Percent size={14} /> Maxsus chegirma
        </div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Percent size={20} className="text-[#FF500B]" /> Chegirmalar!
        </h3>
        <p className="text-lg leading-relaxed">20+ kitob uchun katta chegirmalar mavjud!</p>
        <p className="mt-2 text-sm opacity-80">Batafsil ma'lumot olish uchun bog'laning.</p>
      </div>
      <div className="mt-4 text-sm opacity-60">— PrimePrint jamoasi</div>
    </div>
  );
};

export default LeftMarketingSection;