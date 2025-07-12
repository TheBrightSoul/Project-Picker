//App.tsx

import React, { useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ThemeButton from "./components/ThemeButton";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="h-screen bg-hacker-bg-light dark:bg-hacker-bg-dark overflow-hidden flex flex-col py-10 px-50 transition-all duration-300  font-mono">
      {/* <h1 className="text-2xl font-bold text-center text-hacker-text-light dark:text-hacker-text-dark py-4 flex-shrink-0">
        🔮 Projects
      </h1> */}
      <ProjectCard darkMode={darkMode} />
      <ThemeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;
