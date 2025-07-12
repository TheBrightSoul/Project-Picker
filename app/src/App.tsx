import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
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
    <Router>
      <div className="min-h-screen bg-[url('/GalaxyBackgroundLight.png')] dark:bg-[url('/GalaxyBackground.png')] dark:bg-no-repeat dark:bg-center dark:bg-cover overflow-hidden">
        <div className="h-screen overflow-hidden flex flex-col font-mono">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/projects"
                element={<ProjectsPage darkMode={darkMode} />}
              />
            </Routes>
          </div>
          <ThemeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </Router>
  );
}

export default App;
