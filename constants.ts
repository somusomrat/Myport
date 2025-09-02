
import type { Project, SkillCategory } from './types';

export const PROFILE = {
  name: 'Alex Doe',
  title: 'Senior Frontend React Engineer',
  bio: 'I am a passionate frontend developer with a knack for creating beautiful, functional, and user-centered web applications. With over 8 years of experience, I specialize in the React ecosystem, TypeScript, and modern web technologies.',
  email: 'hello@alexdoe.dev',
  avatar: 'https://i.pravatar.cc/300?u=alexdoe',
};

export const PROJECTS: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce website with a modern design, product filtering, shopping cart, and checkout process, built with Next.js and Tailwind CSS.',
    image: 'https://picsum.photos/seed/ecom/600/400',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js and Recharts, providing insights through dynamic charts and graphs.',
    image: 'https://picsum.photos/seed/dash/600/400',
    tags: ['React', 'TypeScript', 'D3.js', 'Recharts', 'Styled-Components'],
    liveUrl: '#',
  },
  {
    title: 'Project Management Tool',
    description: 'A collaborative project management application with features like drag-and-drop tasks, real-time updates, and user authentication using Firebase.',
    image: 'https://picsum.photos/seed/pmtool/600/400',
    tags: ['React', 'Firebase', 'Redux', 'Material-UI'],
    liveUrl: '#',
    repoUrl: '#',
  },
   {
    title: 'AI-Powered Content Generator',
    description: 'A web app that leverages the Gemini API to generate creative content, from blog posts to social media captions, based on user prompts.',
    image: 'https://picsum.photos/seed/aigen/600/400',
    tags: ['React', 'Gemini API', 'Node.js', 'Express', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Firebase', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Docker', 'Vite', 'Webpack', 'Jest', 'CI/CD'],
  },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
};

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];
