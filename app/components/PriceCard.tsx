import useStore from '../store/store';

interface PriceCardProps {
  darkMode: boolean;
  onOrder: () => void;
}

export default function PriceCard({ darkMode, onOrder }: PriceCardProps) {
  const { totalPrice, calculateTotalPrice, reset, isCalculated } = useStore();

  return (
    <section className={`rounded-xl shadow p-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="flex gap-4 flex-wrap">
        <button onClick={calculateTotalPrice} className="bg-[#FF500B] hover:bg-[#e44907] px-6 py-3 rounded-xl font-bold text-white">Calculate</button>
        <button
          onClick={onOrder}
          disabled={!isCalculated}
          className={`px-6 py-3 rounded-xl font-bold text-white ${isCalculated ? 'bg-[#FF500B] hover:bg-[#e44907]' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Order
        </button>
        <button onClick={reset} className={`px-6 py-3 rounded-xl border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Reset</button>
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
