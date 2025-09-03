import type { Project, SkillCategory, AboutContent } from './types';

export const PROFILE = {
  name: 'Alex Doe',
  title: 'Senior Frontend React Engineer',
  bio: 'I am a passionate frontend developer with a knack for creating beautiful, functional, and user-centered web applications. With over 8 years of experience, I specialize in the React ecosystem, TypeScript, and modern web technologies.',
  email: 'hello@alexdoe.dev',
  avatar: 'https://i.pravatar.cc/300?u=alexdoe',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  }
};

export const PROJECTS: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce website with a modern design, product filtering, shopping cart, and checkout process, built with Next.js and Tailwind CSS.',
    images: ['https://picsum.photos/seed/ecom/600/400'],
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js and Recharts, providing insights through dynamic charts and graphs.',
    images: ['https://picsum.photos/seed/dash/600/400'],
    tags: ['React', 'TypeScript', 'D3.js', 'Recharts', 'Styled-Components'],
    liveUrl: '#',
  },
  {
    title: 'Project Management Tool',
    description: 'A collaborative project management application with features like drag-and-drop tasks, real-time updates, and user authentication using Firebase.',
    images: ['https://picsum.photos/seed/pmtool/600/400'],
    tags: ['React', 'Firebase', 'Redux', 'Material-UI'],
    liveUrl: '#',
    repoUrl: '#',
  },
   {
    title: 'AI-Powered Content Generator',
    description: 'A web app that leverages the Gemini API to generate creative content, from blog posts to social media captions, based on user prompts.',
    images: ['https://picsum.photos/seed/aigen/600/400'],
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

export const ABOUT_CONTENT: AboutContent = {
  img: "https://picsum.photos/seed/about/600/600",
  p1: "Hello! I'm a dedicated frontend developer with a passion for building intuitive, high-performance web applications. My journey into web development started years ago, and since then, I've been hooked on turning complex problems into elegant, user-friendly solutions.",
  p2: "I thrive in collaborative environments and enjoy working with cross-functional teams to bring ideas to life. My expertise lies in the React ecosystem, where I leverage tools like Next.js, Redux, and TypeScript to create robust and scalable applications.",
  p3: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee. I'm always eager to learn and take on new challenges."
};

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];