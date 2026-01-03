import { Phone, Send } from "lucide-react"; // Import Lucide icons

export default function Contact({ darkMode }: { darkMode: boolean }) { // Add darkMode prop
  return (
    <section className={`rounded-xl shadow p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} mt-12`}>
      <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
        <Phone size={20} /> Contact Us
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
        <div className="flex items-center gap-2">
          <a href="tel:+999988217" className={`flex items-center gap-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600"} transition-colors duration-200`}>
            <Phone size={20} />
            <span className="font-semibold">+998 99 998 82 17</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://t.me/PrimePrint7"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600"} transition-colors duration-200`}
          >
            <Send size={20} />
            <span className="font-semibold">PrimePrint7</span>
          </a>
        </div>
      </div>
    </section>
  );
}
