import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center gap-8 py-4 bg-hacker-card-light/60 dark:bg-hacker-card-dark/60 text-hacker-text-light dark:text-hacker-text-dark shadow-md z-50">
      <Link
        to="/"
        className="hover:text-neon-green font-semibold transition duration-200"
      >
        🏠 Home
      </Link>
      <Link
        to="/projects"
        className="hover:text-neon-green font-semibold transition duration-200"
      >
        📁 Projects
      </Link>
    </nav>
  );
};

export default Navbar;
