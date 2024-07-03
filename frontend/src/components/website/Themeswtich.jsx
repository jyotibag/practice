import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export default function Themeswitch() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const theme = newTheme ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.querySelector("html").classList.add(theme);
    document
      .querySelector("html")
      .classList.remove(newTheme ? "light" : "dark");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.querySelector("html").classList.add(theme);
    } else {
      document.querySelector("html").classList.add("light"); // Default theme
    }
  }, []);

  return (
    <div className="mode_switcher">
      {isDarkTheme ? (
        <span className="dark is_active" onClick={toggleTheme}>
          <MdDarkMode size={25} className="text-white" />
        </span>
      ) : (
        <span className="light is_active" onClick={toggleTheme}>
          <CiLight size={25} className="text-white" />
        </span>
      )}
    </div>
  );
}
