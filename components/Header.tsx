
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, PROFILE } from '../constants';

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


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/80 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center h-20">
        <a href="#" className="text-xl font-bold tracking-wider text-accent transition-colors hover:text-white">
          {PROFILE.name.split(' ')[0]}<span className="text-white">.</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="text-text-secondary font-medium hover:text-accent transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-text-primary z-50">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-2/3 bg-secondary/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} animate-slide-in`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
              {NAV_LINKS.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl text-text-primary font-medium hover:text-accent transition-colors duration-300">
                      {link.name}
                  </a>
              ))}
          </div>
      </div>
    </header>
  );
};

export default Header;
