import { useTheme } from "../utils/Hooks";

function ThemeSwitch() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded ${
          theme === "light"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded ${
          theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("parchment")}
        className={`p-2 rounded ${
          theme === "parchment"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        Parchment
      </button>
      <button
        onClick={() => setTheme("coriander")}
        className={`p-2 rounded ${
          theme === "coriander"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        Coriander
      </button>
    </div>
  );
}

export default ThemeSwitch;
