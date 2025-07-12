//Components/ThemeButton.tsx

import React from "react";

interface ThemeButtonProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 font-mono">
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 px-2 py-2 bg-hacker-accent-light dark:bg-hacker-border-dark text-sm rounded-full shadow hover:bg-hacker-border-light hover:text-hacker-text-light dark:hover:bg-hacker-border-dark dark:text-hacker-text-dark hover:dark:text-hacker-text-light transition-colors"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default ThemeButton;
