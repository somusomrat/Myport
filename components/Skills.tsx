import React, {useState} from 'react';
import type { SkillCategory } from '../types';

interface SkillsProps {
  skillCategories: SkillCategory[];
  setSkillCategories: (categories: SkillCategory[]) => void;
  isEditing: boolean;
}

const Skills: React.FC<SkillsProps> = ({ skillCategories, setSkillCategories, isEditing }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setSkillCategories([...skillCategories, { title: newCategory.trim(), skills: [] }]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (catIndex: number) => {
    setSkillCategories(skillCategories.filter((_, i) => i !== catIndex));
  };
  
  const handleAddSkill = (catIndex: number) => {
    const skillToAdd = newSkills[catIndex]?.trim();
    if (skillToAdd) {
      const updatedCategories = [...skillCategories];
      updatedCategories[catIndex].skills.push(skillToAdd);
      setSkillCategories(updatedCategories);
      setNewSkills({...newSkills, [catIndex]: ''});
    }
  };
  
  const handleDeleteSkill = (catIndex: number, skillIndex: number) => {
    const updatedCategories = [...skillCategories];
    updatedCategories[catIndex].skills.splice(skillIndex, 1);
    setSkillCategories(updatedCategories);
  };
  
  return (
    <section id="skills" className="py-24 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Technical Skills</h2>
        <p className="text-lg text-text-secondary mt-2">Technologies I'm proficient with.</p>
        <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
      </div>
      <div className="space-y-12">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex}>
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-semibold text-accent">{category.title}</h3>
              {isEditing && (
                 <button onClick={() => handleDeleteCategory(catIndex)} className="ml-4 text-red-500 hover:text-red-400">&times;</button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center bg-secondary border border-border px-4 py-2 rounded-lg text-text-primary transition-all duration-300 hover:border-accent hover:text-accent">
                  <span>{skill}</span>
                   {isEditing && (
                    <button onClick={() => handleDeleteSkill(catIndex, skillIndex)} className="ml-2 text-red-500 hover:text-red-400 text-xs">&times;</button>
                  )}
                </div>
              ))}
               {isEditing && (
                 <div className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Add skill"
                      value={newSkills[catIndex] || ''}
                      onChange={(e) => setNewSkills({...newSkills, [catIndex]: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(catIndex)}
                      className="bg-primary border border-dashed border-gray-500 px-3 py-1 rounded-md focus:outline-none focus:border-accent"
                    />
                    <button onClick={() => handleAddSkill(catIndex)} className="ml-2 bg-accent text-primary px-3 py-1 rounded-md text-sm">+</button>
                 </div>
              )}
            </div>
          </div>
        ))}
         {isEditing && (
          <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-2xl font-semibold text-accent mb-4">Add New Category</h3>
              <div className="flex items-center">
                <input 
                    type="text" 
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="bg-primary border border-dashed border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:border-accent"
                />
                 <button onClick={handleAddCategory} className="ml-4 bg-accent text-primary font-semibold py-2 px-6 rounded-md hover:bg-white transition-all duration-300">
                    Add Category
                </button>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;