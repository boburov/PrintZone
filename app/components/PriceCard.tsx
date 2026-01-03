import useStore from '../store/store';
import { Calculator, ShoppingCart, RotateCcw } from "lucide-react"; // Import Lucide icons

interface PriceCardProps {
  darkMode: boolean;
  onOrder: () => void;
}

export default function PriceCard({ darkMode, onOrder }: PriceCardProps) {
  const { totalPrice, calculateTotalPrice, reset, isCalculated } = useStore();

  return (
    <section className={`rounded-xl shadow-lg p-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="flex gap-4 flex-wrap">
        <button onClick={calculateTotalPrice} className="bg-[#FF500B] shadow-md hover:bg-[#e44907] px-4 py-2 rounded-xl font-bold text-white flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105">
          <Calculator size={20} /> Calculate
        </button>
        <button
          onClick={onOrder}
          disabled={!isCalculated}
          className={`px-4 py-2 rounded-xl font-bold text-white flex items-center gap-2 transition-all duration-200 ease-in-out shadow-md
            ${isCalculated
              ? 'bg-[#FF500B] hover:bg-[#e44907] transform hover:scale-105'
              : 'bg-gray-400 opacity-60 cursor-not-allowed'
            }`}>
          <ShoppingCart size={20} /> Order
        </button>
        <button onClick={reset} className={`px-4 py-2 rounded-xl border shadow-md flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105
          ${darkMode ? "border-gray-600 hover:bg-gray-700 text-gray-50" : "border-gray-300 hover:bg-gray-100 text-gray-900"}`}>
          <RotateCcw size={20} /> Reset
        </button>
      </div>
      <div className="text-right">
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Price</p>
        <p
          suppressHydrationWarning
          className="text-3xl font-extrabold text-[#FF500B]"
        >
          {new Intl.NumberFormat("uz-UZ", {
            style: "currency",
            currency: "UZS",
          }).format(totalPrice)}
        </p>

      </div>
    </section>
  );
}

