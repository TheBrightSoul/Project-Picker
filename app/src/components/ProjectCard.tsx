import React, { useEffect, useState } from "react";

interface Project {
  name: string;
  description: string;
  difficulty: string;
  status?:
    | "Don't want to Start it yet"
    | "Will do it soon."
    | "Working on it"
    | "Completed";
  daysWorked?: number;
}

const ProjectCard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = async () => {
    const response = await fetch("/data/projects.json");
    const data: Project[] = await response.json();

    const easyProjects = data.filter(
      (p) => p.difficulty === "1" || p.difficulty === "2"
    );
    const mediumProjects = data.filter((p) => p.difficulty === "3");
    const hardProjects = data.filter(
      (p) => p.difficulty === "4" || p.difficulty === "5"
    );

    const getRandomProject = (arr: Project[]) =>
      arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

    const selectedProjects = [
      getRandomProject(easyProjects),
      getRandomProject(mediumProjects),
      getRandomProject(hardProjects),
    ].filter((p): p is Project => p !== null); // type-safe filtering

    setProjects(selectedProjects);
  };

  useEffect(() => {
    loadProjects();
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

  const [projectStatusMap, setProjectStatusMap] = useState<
    Record<string, { status: string; daysWorked: number }>
  >({});

  useEffect(() => {
    const stored = localStorage.getItem("projectStatuses");
    if (stored) {
      setProjectStatusMap(JSON.parse(stored));
    }

    loadProjects();
  }, []);

  const updateStatus = (projectName: string, status: string) => {
    setProjectStatusMap((prev) => {
      const updated = {
        ...prev,
        [projectName]: {
          ...prev[projectName],
          status,
          daysWorked:
            status === "Working on it" ? prev[projectName]?.daysWorked || 0 : 0,
        },
      };
      localStorage.setItem("projectStatuses", JSON.stringify(updated));
      return updated;
    });
  };

  const incrementDays = (projectName: string) => {
    setProjectStatusMap((prev) => {
      const updated = {
        ...prev,
        [projectName]: {
          ...prev[projectName],
          daysWorked: (prev[projectName]?.daysWorked || 0) + 1,
        },
      };
      localStorage.setItem("projectStatuses", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-center mb-6">
        <button
          onClick={loadProjects}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
        >
          🔄 Get New Suggestions
        </button>
      </div>
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <div className="mt-4">
            <label className="text-sm mr-2 font-medium">Status:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={projectStatusMap[project.name]?.status || "Will Do Soon"}
              onChange={(e) => updateStatus(project.name, e.target.value)}
            >
              <option>Will Do Soon</option>
              <option>Working on it</option>
              <option>Completed</option>
            </select>

            {projectStatusMap[project.name]?.status === "Working on it" && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-blue-600">
                  Worked {projectStatusMap[project.name]?.daysWorked || 0} days
                </span>
                <button
                  onClick={() => incrementDays(project.name)}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  ➕ Add Day
                </button>
              </div>
            )}
          </div>

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
