import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Intro from './components/Intro';
import { PROFILE, PROJECTS, SKILLS, ABOUT_CONTENT } from './constants';
import type { AboutContent } from './types';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(PROFILE);
  const [projects, setProjects] = useState(PROJECTS);
  const [skills, setSkills] = useState(SKILLS);
  const [aboutContent, setAboutContent] = useState<AboutContent>(ABOUT_CONTENT);


  useEffect(() => {
    // Load data from localStorage
    const savedProfile = localStorage.getItem('portfolio-profile');
    const savedProjects = localStorage.getItem('portfolio-projects');
    const savedSkills = localStorage.getItem('portfolio-skills');
    const savedAbout = localStorage.getItem('portfolio-about');

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedSkills) setSkills(JSON.parse(savedSkills));
    if (savedAbout) setAboutContent(JSON.parse(savedAbout));

    // Intro screen timer
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem('portfolio-profile', JSON.stringify(profile));
    }
  }, [profile, isLoading]);

  useEffect(() => {
     if(!isLoading) {
      localStorage.setItem('portfolio-projects', JSON.stringify(projects));
    }
  }, [projects, isLoading]);
  
  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem('portfolio-skills', JSON.stringify(skills));
    }
  }, [skills, isLoading]);

  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem('portfolio-about', JSON.stringify(aboutContent));
    }
  }, [aboutContent, isLoading]);

  const handleLogin = () => {
    // In a real app, use a proper auth system.
    const pass = prompt('Enter password to edit:');
    if (pass === 'weare1ummah') { // Use the user-provided password
      setIsAuthenticated(true);
      setIsEditing(true);
    } else {
      alert('Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsEditing(false);
  };

  const handleExport = () => {
    const data = {
      profile,
      projects,
      skills,
      aboutContent,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "portfolio-data.json";
    link.click();
    alert('Portfolio data exported!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
         const file = (event.target as HTMLInputElement).files?.[0];
         if (!file) return;

         if (window.confirm('Are you sure you want to import this data? This will overwrite your current portfolio.')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const data = JSON.parse(text);
                        // Basic validation
                        if (data.profile && data.projects && data.skills && data.aboutContent) {
                          setProfile(data.profile);
                          setProjects(data.projects);
                          setSkills(data.skills);
                          setAboutContent(data.aboutContent);
                          alert('Data imported successfully!');
                        } else {
                          alert('Invalid data file. Please check the file format.');
                        }
                    }
                } catch (error) {
                    console.error("Failed to parse JSON file", error);
                    alert('Failed to import data. The file might be corrupted.');
                }
            };
            reader.readAsText(file);
         }
    };
    input.click();
  };
  
  if (isLoading) {
    return <Intro name={profile.name} />;
  }

  return (
    <div className="bg-primary text-text-primary min-h-screen font-sans">
      <Header 
        profile={profile}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onExport={handleExport}
        onImport={handleImport}
      />
      <main className="container mx-auto px-4 md:px-8 lg:px-16">
        <Hero 
          profile={profile} 
          setProfile={setProfile} 
          isEditing={isEditing} 
        />
        <About 
          isEditing={isEditing} 
          content={aboutContent}
          setContent={setAboutContent}
        />
        <Projects 
          projects={projects}
          setProjects={setProjects}
          isEditing={isEditing}
        />
        <Skills 
          skillCategories={skills}
          setSkillCategories={setSkills}
          isEditing={isEditing}
        />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
};

export default App;
