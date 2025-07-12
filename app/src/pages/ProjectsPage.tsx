import React from "react";
import ProjectCard from "../components/ProjectCard";
import PageWrapper from "../components/PageWrapper";

interface ProjectsPageProps {
  darkMode: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ darkMode }) => {
  return (
    <PageWrapper>
      <div className="overflow-hidden flex flex-col px-50 transition-all duration-300 font-mono">
        <ProjectCard darkMode={darkMode} />
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
