import React, { useRef, useState } from 'react';
import type { PROFILE as ProfileType } from '../constants';
import { GithubIcon, LinkedinIcon, SpinnerIcon, TwitterIcon } from './Icons';

interface HeroProps {
  profile: typeof ProfileType;
  setProfile: (profile: typeof ProfileType) => void;
  isEditing: boolean;
}

const Hero: React.FC<HeroProps> = ({ profile, setProfile, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // This is a public, free-to-use API key for freeimage.host.
  const FREEIMAGE_API_KEY = '6d207e02198a847aa98d0a2a901485a5';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('source', file); // Use 'source' for freeimage.host

    try {
      const response = await fetch(`https://freeimage.host/api/1/upload?key=${FREEIMAGE_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error?.message || `Image upload failed with status: ${response.status}`);
      }

      if (result.image && result.image.url) {
        setProfile({ ...profile, avatar: result.image.url });
      } else {
        throw new Error('Image URL not found in API response.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsUploading(false);
    }
  };


  const handleInputChange = (field: keyof typeof ProfileType, value: string) => {
    setProfile({ ...profile, [field]: value });
  };
  
  const handleSocialChange = (field: keyof typeof profile.social, value: string) => {
    setProfile({ ...profile, social: { ...profile.social, [field]: value } });
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 animate-fade-in-up">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-6 group">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full rounded-full border-4 border-accent shadow-lg"
          />
          {isUploading && (
             <div className="absolute inset-0 rounded-full bg-black/80 flex items-center justify-center text-white">
                <SpinnerIcon />
             </div>
          )}
          {isEditing && !isUploading && (
            <div 
              className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <span>Upload</span>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="max-w-2xl mx-auto space-y-4">
            <input 
              type="text" 
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-5xl md:text-7xl font-bold bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full"
            />
             <input 
              type="text" 
              value={profile.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="text-2xl md:text-3xl font-light text-text-secondary bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full"
            />
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="text-lg text-text-secondary bg-transparent text-center border-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full rounded-md p-2 h-32 resize-none"
            />
            <input 
              type="email" 
              value={profile.email}
              placeholder="Contact Email"
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="text-lg text-text-secondary bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full"
            />
             <input 
              type="url" 
              value={profile.social.github}
              placeholder="GitHub URL"
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className="text-lg text-text-secondary bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full"
            />
             <input 
              type="url" 
              value={profile.social.linkedin}
              placeholder="LinkedIn URL"
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="text-lg text-text-secondary bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full"
            />
             <input 
              type="url" 
              value={profile.social.twitter}
              placeholder="Twitter URL"
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              className="text-lg text-text-secondary bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full"
            />
          </div>
        ) : (
          <>
            <h1 className="text-5xl md:text-7xl font-bold mb-2">
              Hi, I'm <span className="text-accent">{profile.name.split(' ')[0]}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-text-secondary mb-6">{profile.title}</h2>
            <p className="max-w-2xl mx-auto text-lg text-text-secondary mb-8">
              {profile.bio}
            </p>
          </>
        )}
        
        <div className="flex justify-center items-center space-x-6 mt-8">
          <a href="#projects" className="bg-accent text-primary font-semibold py-3 px-8 rounded-full hover:bg-white transition-all duration-300 shadow-lg">
            View My Work
          </a>
          <div className="flex items-center space-x-4">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
              <GithubIcon />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
              <LinkedinIcon />
            </a>
            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;