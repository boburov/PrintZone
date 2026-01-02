import Image from "next/image";
import logo from "@/public/logo.png";
interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-1">
        <Image src={logo} className="w-12" alt="printzone logo" /> PrimePrint
      </h1>
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-lg border ${darkMode
          ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
          : "border-gray-300 bg-gray-200 hover:bg-gray-300"
          } font-semibold`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
