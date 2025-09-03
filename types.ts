
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface AboutContent {
  img: string;
  p1: string;
  p2: string;
  p3: string;
}
