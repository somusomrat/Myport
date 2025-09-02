import React from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  isEditing: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ projects, setProjects, isEditing }) => {

  const handleAddProject = () => {
    const newProject: Project = {
      title: 'New Project',
      description: 'A brief description of your new project.',
      image: 'https://picsum.photos/seed/new/600/400',
      tags: ['React', 'New'],
      liveUrl: '#',
      repoUrl: '#'
    };
    setProjects([newProject, ...projects]);
  };

  const handleDeleteProject = (index: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleUpdateProject = (index: number, updatedProject: Project) => {
    const newProjects = [...projects];
    newProjects[index] = updatedProject;
    setProjects(newProjects);
  };

  return (
    <section id="projects" className="py-24 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">My Projects</h2>
        <p className="text-lg text-text-secondary mt-2">A selection of my recent work.</p>
        <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
         {isEditing && (
          <div className="mt-6">
            <button onClick={handleAddProject} className="bg-accent text-primary font-semibold py-2 px-6 rounded-md hover:bg-white transition-all duration-300">
              Add New Project
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project}
            isEditing={isEditing}
            onDelete={() => handleDeleteProject(index)}
            onUpdate={(updatedProject) => handleUpdateProject(index, updatedProject)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;