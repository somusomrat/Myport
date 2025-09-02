
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Technical Skills</h2>
        <p className="text-lg text-text-secondary mt-2">Technologies I'm proficient with.</p>
        <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
      </div>
      <div className="space-y-12">
        {SKILLS.map((category) => (
          <div key={category.title}>
            <h3 className="text-2xl font-semibold text-accent mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <div key={skill} className="bg-secondary border border-border px-4 py-2 rounded-lg text-text-primary transition-all duration-300 hover:border-accent hover:text-accent">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;