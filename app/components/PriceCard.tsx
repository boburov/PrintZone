interface PriceCardProps {
  pageCount: number | "";
  copies: number;
  paperSize: "A5" | "A4";
  coverType: "soft" | "hard";
  totalPrice: number | null;
  setTotalPrice: React.Dispatch<React.SetStateAction<number | null>>;
  darkMode: boolean;
  formatMoney: (v: number | null) => string;
}

export default function PriceCard({ pageCount, copies, paperSize, coverType, totalPrice, setTotalPrice, darkMode, formatMoney }: PriceCardProps) {
  const calculatePrice = () => {
    const bet = Number(pageCount) || 0;
    const nusxa = Number(copies) || 1;
    let jild = coverType === "hard" ? 25000 : 5500;
    let qogozNarx =
      coverType === "soft"
        ? paperSize === "A5"
          ? 57
          : 110
        : paperSize === "A5"
        ? 70
        : 120;
    let kitobPrice = bet * qogozNarx + jild;

    if (nusxa === 1) kitobPrice *= 3;
    else if (nusxa <= 10) kitobPrice *= 2;
    else if (nusxa <= 20) kitobPrice = Math.round(kitobPrice * 1.3);

    const total = Math.round(kitobPrice * nusxa * 1.2);
    setTotalPrice(total);
  };

  return (
    <section className={`rounded-xl shadow p-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="flex gap-4 flex-wrap">
        <button onClick={calculatePrice} className="bg-[#FF500B] hover:bg-[#e44907] px-6 py-3 rounded-xl font-bold text-white">Calculate</button>
        <button onClick={() => setTotalPrice(null)} className={`px-6 py-3 rounded-xl border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Reset</button>
      </div>
      <div className="text-right">
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Price</p>
        <p className="text-3xl font-extrabold text-[#FF500B]">{formatMoney(totalPrice)}</p>
      </div>
    </section>
  );
}
