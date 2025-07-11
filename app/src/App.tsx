import React from "react";
import ProjectCard from "./components/ProjectCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🔮 Your Weekly Project Picks
      </h1>
      <ProjectCard />
    </div>
  );
}

export default App;
