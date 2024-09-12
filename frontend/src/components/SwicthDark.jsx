import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/darkSide";

export default function SwitchDark(sunColor) {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === "dark");

  const toggleDarkMode = (checked) => {
    setTheme(checked ? "dark" : "light");
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        sunColor={sunColor}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={screen.width < 767 ? 25 : 35 && screen.width > 767 ? 35 : 30}
      />
    </>
  );
}
