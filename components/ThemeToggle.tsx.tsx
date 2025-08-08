import { useState, useEffect } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded dark:text-white"
        >
            {theme === "light" ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
        </button>
    );
}
