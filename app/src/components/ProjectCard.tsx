//Components/ProjectCard.tsx

import React, { useEffect, useState } from "react";

import StatusSelector from "./StatusSelector";

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

interface ProjectCardProps {
  darkMode: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ darkMode }) => {
  const [easyProjects, setEasyProjects] = useState<Project[]>([]);
  const [mediumProjects, setMediumProjects] = useState<Project[]>([]);
  const [hardProjects, setHardProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/data/projects.json");
      const data: Project[] = await response.json();

      const easy = data.filter(
        (p) => p.difficulty === "1" || p.difficulty === "2"
      );
      const medium = data.filter((p) => p.difficulty === "3");
      const hard = data.filter(
        (p) => p.difficulty === "4" || p.difficulty === "5"
      );

      setEasyProjects(easy);
      setMediumProjects(medium);
      setHardProjects(hard);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
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
  const decrementDays = (projectName: string) => {
    setProjectStatusMap((prev) => {
      const updated = {
        ...prev,
        [projectName]: {
          ...prev[projectName],
          daysWorked: (prev[projectName]?.daysWorked || 0) - 1,
        },
      };
      localStorage.setItem("projectStatuses", JSON.stringify(updated));
      return updated;
    });
  };

  const renderProjectColumn = (
    projects: Project[],
    title: string,
    bgColor: string
  ) => {
    return (
      <div className="flex-1 bg-hacker-card-light dark:bg-hacker-card-dark rounded-lg border border-hacker-border-light dark:border-hacker-border-dark ">
        <h2
          className={`text-xl font-bold mb-4 ${bgColor} text-white px-4 py-3 rounded-t-lg text-shadow-[1px_2px_10px_#000000]`}
        >
          {title} ({projects.length})
        </h2>
        <div
          className={`h-[calc(100vh-250px)] overflow-y-auto px-4 pb-4 ${
            darkMode ? "custom-scrollbar-dark" : "custom-scrollbar-light"
          }`}
        >
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={`${title}-${index}`}
                className="bg-white dark:bg-hacker-card-dark shadow-md rounded-lg p-4 border border-hacker-border-light dark:border-hacker-border-dark hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-hacker-text-light dark:text-hacker-text-dark mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-hacker-text-dark/80 mb-3 text-sm line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500 dark:text-hacker-text-dark/60 mr-2">
                    Difficulty:
                  </span>
                  {renderStars(project.difficulty)}
                </div>
                <div className="space-y-2">
                  <StatusSelector
                    value={projectStatusMap[project.name]?.status}
                    onChange={(val) => updateStatus(project.name, val)}
                  />

                  {projectStatusMap[project.name]?.status ===
                    "Working on it" && (
                    <div className="flex items-center justify-between gap-2 rounded p-2 shadow-inner bg-[rgba(0,255,159,0.08)] dark:bg-[rgba(0,255,159,0.12)]">
                      <button
                        onClick={() => incrementDays(project.name)}
                        className="text-sm px-2 py-1 rounded bg-neon-green text-hacker-text-dark hover:bg-neon-green/80 shadow-md hover:shadow-[0_0_6px_rgba(0,255,159,0.4)] transition"
                      >
                        <h1 className="font-extrabold text-xl text-hacker-bg-light dark:text-hacker-bg-dark text-shadow-md/30 text-shadow-hacker-bg-dark">
                          +
                        </h1>
                      </button>

                      <span className="text-xs text-hacker-text-light dark:text-hacker-text-dark">
                        worked on it for{" "}
                        <span className="font-semibold text-neon-green">
                          {projectStatusMap[project.name]?.daysWorked || 0}
                        </span>{" "}
                        days
                      </span>
                      <button
                        onClick={() => decrementDays(project.name)}
                        className="text-sm px-2 py-1 rounded bg-neon-green text-hacker-text-dark hover:bg-neon-green/80 shadow-md hover:shadow-[0_0_6px_rgba(0,255,159,0.4)] transition"
                      >
                        <h1 className="font-extrabold text-xl text-hacker-bg-light dark:text-hacker-bg-dark text-shadow-md/30 text-shadow-hacker-bg-dark">
                          -
                        </h1>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center min-h-64">
        <div className="text-lg text-hacker-text-light/80 dark:text-hacker-text-dark/80">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex gap-4 p-4 min-h-0">
      {/* Optional refresh button - commented out but updated if needed:
    <div className="flex justify-center mb-4">
      <button
        onClick={loadProjects}
        className="bg-hacker-accent-light hover:bg-hacker-accent-light/90 dark:bg-hacker-accent-dark dark:hover:bg-hacker-accent-dark/90 text-hacker-text-dark font-semibold px-6 py-2 rounded-full shadow-md transition"
      >
        🔄 Refresh Projects
      </button>
    </div>
    */}
      <div className="flex-1 flex gap-30 min-h-0">
        {renderProjectColumn(easyProjects, "Easy Projects", "bg-neon-green")}
        {renderProjectColumn(mediumProjects, "Medium Projects", "bg-neon-blue")}
        {renderProjectColumn(hardProjects, "Hard Projects", "bg-neon-pink")}
      </div>
    </div>
  );
};

export default ProjectCard;
