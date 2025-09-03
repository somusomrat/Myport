import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import type { PROFILE as ProfileType } from '../constants';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface HeaderProps {
    profile: typeof ProfileType;
    isAuthenticated: boolean;
    onLogin: () => void;
    onLogout: () => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onCloudSync: () => void;
    hasCloudLink: boolean;
}


const Header: React.FC<HeaderProps> = ({ profile, isAuthenticated, onLogin, onLogout, isEditing, setIsEditing, onCloudSync, hasCloudLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const syncButtonText = hasCloudLink ? 'Sync Updates' : 'Get Permanent Link';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/80 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center h-20">
        <a href="#" className="text-xl font-bold tracking-wider text-accent transition-colors hover:text-white">
          {profile.name.split(' ')[0]}<span className="text-white">.</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="text-text-secondary font-medium hover:text-accent transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
                <>
                    {isEditing && (
                      <button onClick={onCloudSync} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-all duration-300 text-sm">
                        {syncButtonText}
                      </button>
                    )}
                    <div className="flex items-center space-x-2">
                        <span className={`text-sm ${isEditing ? 'text-accent' : 'text-text-secondary'}`}>{isEditing ? 'Edit Mode' : 'View Mode'}</span>
                         <label htmlFor="edit-toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" id="edit-toggle" className="sr-only" checked={isEditing} onChange={() => setIsEditing(!isEditing)} />
                                <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isEditing ? 'transform translate-x-full bg-accent' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <button onClick={onLogout} className="bg-accent/20 text-accent font-semibold py-2 px-4 rounded-md hover:bg-accent/40 transition-all duration-300">
                        Logout
                    </button>
                </>
            ) : (
                <button onClick={onLogin} className="bg-accent text-primary font-semibold py-2 px-4 rounded-md hover:bg-white transition-all duration-300">
                    Login to Edit
                </button>
            )}
        </div>


        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-text-primary">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-2/3 bg-secondary/95 backdrop-blur-lg transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
              {NAV_LINKS.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl text-text-primary font-medium hover:text-accent transition-colors duration-300">
                      {link.name}
                  </a>
              ))}
              <div className="mt-8 flex flex-col items-center space-y-6 w-full px-8">
                 {isAuthenticated ? (
                    <>
                       <div className="flex items-center space-x-2">
                          <span className={`text-sm ${isEditing ? 'text-accent' : 'text-text-secondary'}`}>{isEditing ? 'Edit Mode' : 'View Mode'}</span>
                           <label htmlFor="mobile-edit-toggle" className="flex items-center cursor-pointer">
                              <div className="relative">
                                  <input type="checkbox" id="mobile-edit-toggle" className="sr-only" checked={isEditing} onChange={() => setIsEditing(!isEditing)} />
                                  <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isEditing ? 'transform translate-x-full bg-accent' : ''}`}></div>
                              </div>
                          </label>
                      </div>
                       {isEditing && (
                         <button onClick={() => { onCloudSync(); setIsOpen(false); }} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-500 transition-all duration-300 w-full">
                           {syncButtonText}
                         </button>
                       )}
                      <button onClick={() => { onLogout(); setIsOpen(false); }} className="bg-accent/20 text-accent font-semibold py-3 px-6 rounded-md hover:bg-accent/40 transition-all duration-300 w-full">
                          Logout
                      </button>
                    </>
                ) : (
                    <button onClick={() => { onLogin(); setIsOpen(false); }} className="bg-accent text-primary font-semibold py-3 px-6 rounded-md hover:bg-white transition-all duration-300 w-full">
                        Login to Edit
                    </button>
                )}
              </div>
          </div>
      </div>
    </header>
  );
};

export default Header;