
import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 animate-fade-in-up" style={{ animationDelay: '400ms', opacity: 0 }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">My Projects</h2>
        <p className="text-lg text-text-secondary mt-2">A selection of my recent work.</p>
        <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
