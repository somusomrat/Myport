import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Intro from './components/Intro';
import { PROFILE, PROJECTS, SKILLS, SOCIAL_LINKS, NAV_LINKS } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(PROFILE);
  const [projects, setProjects] = useState(PROJECTS);
  const [skills, setSkills] = useState(SKILLS);

  useEffect(() => {
    // Load data from localStorage
    const savedProfile = localStorage.getItem('portfolio-profile');
    const savedProjects = localStorage.getItem('portfolio-projects');
    const savedSkills = localStorage.getItem('portfolio-skills');

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedSkills) setSkills(JSON.parse(savedSkills));

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

  const handleLogin = () => {
    // In a real app, use a proper auth system.
    const pass = prompt('Enter password to edit:');
    if (pass === 'admin') { // Replace 'admin' with your desired password
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
  
  if (isLoading) {
    return <Intro name={profile.name} />;
  }

  return (
    <div className="bg-primary text-text-primary min-h-screen font-sans">
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <main className="container mx-auto px-4 md:px-8 lg:px-16">
        <Hero 
          profile={profile} 
          setProfile={setProfile} 
          isEditing={isEditing} 
        />
        <About isEditing={isEditing} />
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