import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react'; // Import Sparkles icon

interface MarketingSectionProps {
  darkMode: boolean;
}

const RightMarketingSection: React.FC<MarketingSectionProps> = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg h-full flex flex-col justify-between ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 mb-3">
          <Sparkles size={14} /> Premium xizmat
        </div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Sparkles size={20} className="text-[#FF500B]" /> Maxsus Taklif!
        </h3>
        <p className="text-lg leading-relaxed">O'zingizning dizayningiz bilan chop eting.</p>
        <p className="mt-2 text-sm opacity-80">Yuqori sifat, tezkor xizmat!</p>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm font-medium">
        <ShieldCheck size={18} className="text-emerald-500" />
        <span>Ishonchli • Tezkor • Yuqori sifat</span>
      </div>
    </div>
  );
};

export default RightMarketingSection;