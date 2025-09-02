
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
