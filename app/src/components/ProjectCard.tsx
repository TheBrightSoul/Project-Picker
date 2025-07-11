import React, { useEffect, useState } from "react";

interface Project {
  name: string;
  description: string;
  difficulty: string;
}

const ProjectCard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProjects(shuffled.slice(0, 3));
      });
  }, []);

  const renderStars = (difficulty: string) => {
    const num = parseInt(difficulty, 10);
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < num ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {project.name}
          </h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Difficulty:</span>
            {renderStars(project.difficulty)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
