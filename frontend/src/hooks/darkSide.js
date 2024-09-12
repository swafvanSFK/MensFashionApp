import {  useEffect } from "react";
import { useTheme } from "../store/generalStore";

export default function useDarkSide() {
    
    const {theme, setTheme} =useTheme()

    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme, colorTheme]);

    return [theme, setTheme];
}
