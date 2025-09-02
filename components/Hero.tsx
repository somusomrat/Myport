import React, { useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import type { PROFILE as ProfileType } from '../constants';

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

interface HeroProps {
  profile: typeof ProfileType;
  setProfile: (profile: typeof ProfileType) => void;
  isEditing: boolean;
}

const Hero: React.FC<HeroProps> = ({ profile, setProfile, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof typeof ProfileType, value: string) => {
    setProfile({ ...profile, [field]: value });
  };
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 animate-fade-in-up">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-6 group">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full rounded-full border-4 border-accent shadow-lg"
          />
          {isEditing && (
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
          <>
            <input 
              type="text" 
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-5xl md:text-7xl font-bold mb-2 bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full max-w-lg mx-auto"
            />
             <input 
              type="text" 
              value={profile.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="text-2xl md:text-3xl font-light text-text-secondary mb-6 bg-transparent text-center border-b-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full max-w-xl mx-auto"
            />
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="max-w-2xl mx-auto text-lg text-text-secondary mb-8 bg-transparent text-center border-2 border-dashed border-gray-500 focus:border-accent focus:outline-none w-full rounded-md p-2 h-32 resize-none"
            />
          </>
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
        
        <div className="flex justify-center items-center space-x-6">
          <a href="#projects" className="bg-accent text-primary font-semibold py-3 px-8 rounded-full hover:bg-white transition-all duration-300 shadow-lg">
            View My Work
          </a>
          <div className="flex items-center space-x-4">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
              <GithubIcon />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;