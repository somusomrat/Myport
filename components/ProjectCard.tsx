import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (project: Project) => void;
}

const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditing, onDelete, onUpdate }) => {
  const [isCardEditing, setIsCardEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This is a public, free-to-use API key for imgbb.
  const IMGBB_API_KEY = 'd70457833a251b14a2754388439e7b2f';

  useEffect(() => {
    setEditedProject(project);
  }, [project]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const result = await response.json();
      if (result.data && result.data.url) {
        setEditedProject({ ...editedProject, image: result.data.url });
      } else {
        throw new Error('Image URL not found in response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try another image or try again later.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSave = () => {
    onUpdate?.(editedProject);
    setIsCardEditing(false);
  };
  
  const handleCancel = () => {
    setEditedProject(project);
    setIsCardEditing(false);
  }

  const renderEditingView = () => (
     <div className="bg-secondary rounded-lg overflow-hidden border border-accent shadow-lg p-6 space-y-4">
        <div className="relative group w-full h-56 mb-4">
            <img src={editedProject.image} alt={editedProject.title} className="w-full h-full object-cover rounded-md" />
            {isUploading ? (
               <div className="absolute inset-0 rounded-md bg-black/80 flex items-center justify-center text-white">
                    <span>Uploading...</span>
               </div>
            ) : (
               <div 
                  className="absolute inset-0 rounded-md bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
               >
                  <span>Upload Image</span>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*"/>
               </div>
            )}
        </div>
        <input type="text" value={editedProject.title} onChange={(e) => setEditedProject({...editedProject, title: e.target.value})} className="w-full bg-primary p-2 rounded-md text-2xl font-bold text-accent" placeholder="Project Title" />
        <textarea value={editedProject.description} onChange={(e) => setEditedProject({...editedProject, description: e.target.value})} className="w-full bg-primary p-2 rounded-md h-24 resize-none" placeholder="Project Description" />
        <input type="text" value={editedProject.tags.join(', ')} onChange={(e) => setEditedProject({...editedProject, tags: e.target.value.split(',').map(t => t.trim())})} className="w-full bg-primary p-2 rounded-md" placeholder="Tags (comma-separated)" />
        <input type="text" value={editedProject.liveUrl} onChange={(e) => setEditedProject({...editedProject, liveUrl: e.target.value})} className="w-full bg-primary p-2 rounded-md" placeholder="Live URL" />
        <input type="text" value={editedProject.repoUrl} onChange={(e) => setEditedProject({...editedProject, repoUrl: e.target.value})} className="w-full bg-primary p-2 rounded-md" placeholder="Repo URL" />
        <div className="flex justify-end space-x-2">
            <button onClick={handleCancel} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
            <button onClick={handleSave} className="bg-accent text-primary font-semibold py-2 px-4 rounded-md hover:bg-white transition-colors">Save</button>
        </div>
    </div>
  );

  const renderDefaultView = () => (
     <div className="bg-secondary rounded-lg overflow-hidden border border-border group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg relative">
        {isEditing && (
            <div className="absolute top-2 right-2 z-10 space-x-2">
                 <button onClick={() => setIsCardEditing(true)} className="bg-blue-500/80 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">Edit</button>
                 <button onClick={onDelete} className="bg-red-500/80 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
            </div>
        )}
      <div className="relative overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
         <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-accent">{project.title}</h3>
        <p className="text-text-secondary mb-4 h-24 overflow-hidden">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4 h-14 overflow-hidden">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-border">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors">
              <ExternalLinkIcon />
              <span>Live Demo</span>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors">
              <GithubIcon />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return isCardEditing ? renderEditingView() : renderDefaultView();
};

export default ProjectCard;