import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../types';
import { ExternalLinkIcon, GithubIcon, SpinnerIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditing, onDelete, onUpdate }) => {
  const [isCardEditing, setIsCardEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // This is a public, free-to-use API key for freeimage.host.
  const FREEIMAGE_API_KEY = '6d207e02198a847aa98d0a2a901485a5';

  useEffect(() => {
    setEditedProject(project);
    setCurrentImageIndex(0);
  }, [project]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('source', file);
        try {
            const response = await fetch(`https://freeimage.host/api/1/upload?key=${FREEIMAGE_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error?.message || `Image upload failed`);
            }
            if (result.image && result.image.url) {
                uploadedUrls.push(result.image.url);
            } else {
                throw new Error('Image URL not found in API response.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(`Failed to upload one or more images: ${error instanceof Error ? error.message : String(error)}`);
            break; 
        }
    }
    
    if (uploadedUrls.length > 0) {
        setEditedProject(prev => ({ ...prev, images: [...(prev.images || []), ...uploadedUrls] }));
    }
    setIsUploading(false);
    // Reset file input value to allow re-uploading the same file
    if (e.target) e.target.value = '';
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setEditedProject(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToDelete)
    }));
  };
  
  const handleSave = () => {
    onUpdate?.(editedProject);
    setIsCardEditing(false);
  };
  
  const handleCancel = () => {
    setEditedProject(project);
    setIsCardEditing(false);
  }

  const nextImage = () => {
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    }
  };

  const renderEditingView = () => (
     <div className="bg-secondary rounded-lg overflow-hidden border border-accent shadow-lg p-6 space-y-4">
        <h4 className="text-lg font-semibold text-text-secondary border-b border-border pb-2">Manage Images</h4>
        <div className="grid grid-cols-3 gap-2">
            {editedProject.images.map((img, index) => (
                <div key={index} className="relative group">
                    <img src={img} alt={`Project image ${index + 1}`} className="w-full h-24 object-cover rounded-md"/>
                    <button onClick={() => handleDeleteImage(index)} className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm">&times;</button>
                </div>
            ))}
            <div className="relative">
                <button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={isUploading}
                    className="w-full h-24 border-2 border-dashed border-gray-500 rounded-md flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
                >
                    {isUploading ? <SpinnerIcon /> : <span>+ Add</span>}
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" multiple/>
            </div>
        </div>
        <h4 className="text-lg font-semibold text-text-secondary border-b border-border pb-2 pt-4">Edit Details</h4>
        <input type="text" value={editedProject.title} onChange={(e) => setEditedProject({...editedProject, title: e.target.value})} className="w-full bg-primary p-2 rounded-md text-2xl font-bold text-accent" placeholder="Project Title" />
        <textarea value={editedProject.description} onChange={(e) => setEditedProject({...editedProject, description: e.target.value})} className="w-full bg-primary p-2 rounded-md h-24 resize-none" placeholder="Project Description" />
        <input 
          type="text" 
          value={editedProject.tags.join(', ')} 
          onChange={(e) => setEditedProject({...editedProject, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} 
          className="w-full bg-primary p-2 rounded-md" 
          placeholder="Tags (comma-separated)" 
        />
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
            <div className="absolute top-2 right-2 z-20 space-x-2">
                 <button onClick={() => setIsCardEditing(true)} className="bg-blue-500/80 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">Edit</button>
                 <button onClick={onDelete} className="bg-red-500/80 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
            </div>
        )}
      <div className="relative overflow-hidden h-56">
        <img src={project.images?.[currentImageIndex] || 'https://picsum.photos/seed/placeholder/600/400'} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
         <div className="absolute inset-0 bg-black/40"></div>
         {project.images && project.images.length > 1 && (
            <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&lt;</button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&gt;</button>
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                    {project.images.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-accent' : 'bg-white/50'}`}></div>
                    ))}
                </div>
            </>
         )}
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
              <GithubIcon width={20} height={20} />
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
