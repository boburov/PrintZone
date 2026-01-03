import Image from "next/image";
import logo from "@/public/logo.png";
import { Moon, Sun } from "lucide-react"; // Import Lucide icons

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2"> {/* Increased gap from 1 to 2 */}
        <Image src={logo} className="w-12" alt="printzone logo" /> PrimePrint
      </h1>
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105
          ${darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-gray-50"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
