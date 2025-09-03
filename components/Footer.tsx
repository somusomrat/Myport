import React from 'react';
import type { PROFILE as ProfileType } from '../constants';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

interface FooterProps {
  profile: typeof ProfileType;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-text-secondary">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            <GithubIcon />
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            <LinkedinIcon />
          </a>
           <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            <TwitterIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;