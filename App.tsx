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
  const [cloudBinId, setCloudBinId] = useState<string | null>(null);


  useEffect(() => {
    // Attempt to load the portfolio owner's cloud link ID from local storage
    const savedBinId = localStorage.getItem('portfolio-cloud-bin-id');
    if (savedBinId) {
      setCloudBinId(savedBinId);
    }

    const hash = window.location.hash;
    let loadedFromUrl = false;

    // 1. Prioritize loading from a #live URL hash (for shared links)
    if (hash && hash.startsWith('#live=')) {
      const binId = hash.substring(6);
      setIsLoading(true); // Show loading screen while fetching
      fetch(`https://jsonblob.com/api/jsonBlob/${binId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.profile && data.projects && data.skills && data.aboutContent) {
            setProfile(data.profile);
            setProjects(data.projects);
            setSkills(data.skills);
            setAboutContent(data.aboutContent);
            alert('Portfolio loaded from live link!');
          }
        })
        .catch(error => {
          console.error("Failed to load portfolio from live link:", error);
          alert("Could not load portfolio from the provided link. It might be invalid or expired.");
        })
        .finally(() => {
          // Use a short delay before hiding loader to allow content to render
          setTimeout(() => setIsLoading(false), 500);
        });
      
      window.history.replaceState(null, '', window.location.pathname + window.location.search); // Clear hash
      loadedFromUrl = true;

    } else {
        // 2. If no #live hash, fall back to localStorage (for the owner)
        const savedProfile = localStorage.getItem('portfolio-profile');
        const savedProjects = localStorage.getItem('portfolio-projects');
        const savedSkills = localStorage.getItem('portfolio-skills');
        const savedAbout = localStorage.getItem('portfolio-about');
        
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedSkills) setSkills(JSON.parse(savedSkills));
        if (savedAbout) setAboutContent(JSON.parse(savedAbout));
        
        // Regular intro screen timer
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if(!isLoading) localStorage.setItem('portfolio-profile', JSON.stringify(profile));
  }, [profile, isLoading]);

  useEffect(() => {
    if(!isLoading) localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects, isLoading]);
  
  useEffect(() => {
    if(!isLoading) localStorage.setItem('portfolio-skills', JSON.stringify(skills));
  }, [skills, isLoading]);

  useEffect(() => {
    if(!isLoading) localStorage.setItem('portfolio-about', JSON.stringify(aboutContent));
  }, [aboutContent, isLoading]);

  const handleLogin = () => {
    const pass = prompt('Enter password to edit:');
    if (pass === 'weare1ummah') {
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

  const handleCloudSync = async () => {
    const dataToSync = { profile, projects, skills, aboutContent };
    const endpoint = cloudBinId ? `https://jsonblob.com/api/jsonBlob/${cloudBinId}` : 'https://jsonblob.com/api/jsonBlob';
    const method = cloudBinId ? 'PUT' : 'POST';

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSync),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        if (cloudBinId) {
            alert('✅ Synced to cloud! Your permanent link is updated with the latest changes.');
            prompt(
              "Your permanent link (copy and share this):",
              `${window.location.origin}${window.location.pathname}#live=${cloudBinId}`
            );
        } else {
            const newBinLocation = response.headers.get('Location');
            if (newBinLocation) {
                const newBinId = newBinLocation.split('/').pop();
                if (newBinId) {
                    setCloudBinId(newBinId);
                    localStorage.setItem('portfolio-cloud-bin-id', newBinId);
                    alert('✅ First sync successful! A permanent link has been created for you.');
                    prompt(
                      "HERE IS YOUR PERMANENT LINK\n\nSave this link! Share it with your friends. They will always see your latest synced version here.",
                      `${window.location.origin}${window.location.pathname}#live=${newBinId}`
                    );
                } else {
                    throw new Error("Could not extract new ID from response.");
                }
            } else {
                 throw new Error("Could not find the location of the new data store from response headers.");
            }
        }
    } catch (error) {
        console.error("Cloud sync failed:", error);
        alert(`❌ Failed to sync to the cloud. Please try again.\n\nError: ${error instanceof Error ? error.message : String(error)}`);
    }
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
        onCloudSync={handleCloudSync}
        hasCloudLink={!!cloudBinId}
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