import { Phone, Send } from "lucide-react"; // Import Lucide icons

export default function Contact({ darkMode }: { darkMode: boolean }) { // Add darkMode prop
  return (
    <section className={`rounded-xl shadow-lg p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} mt-12`}>
      <h2 className="text-xl font-extrabold text-center mb-4 flex items-center justify-center gap-2"> {/* Changed to font-extrabold */}
        <Phone size={20} /> Contact Us
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
        <div className="flex items-center gap-2">
          <a
            href="tel:+999988217"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105
              ${darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-500 hover:bg-gray-100"}`}
          >
            <Phone size={20} />
            <span className="font-semibold">+998 99 998 82 17</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://t.me/PrimePrint7"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105
              ${darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-500 hover:bg-gray-100"}`}
          >
            <Send size={20} />
            <span className="font-semibold">PrimePrint7</span>
          </a>
        </div>
      </div>
    </section>
  );
}
