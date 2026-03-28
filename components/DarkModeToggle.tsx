"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    // 1. 初始化：從 localStorage 或系統偏好讀取
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
            setIsDark(true);
        }
        setMounted(true);
    }, []);

    // 2. 同步：當 isDark 改變時，更新 DOM 與 localStorage
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark, mounted]);

    const toggleTheme = () => setIsDark(!isDark);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-600 dark:text-gray-300"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? (
                <Moon size={20} className="rotate-0 scale-100 transition-all" />
            ) : (
                <Sun size={20} className="rotate-0 scale-100 transition-all" />
            )}
        </button>
    );
}
