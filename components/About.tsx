
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">About Me</h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
          <img src="https://picsum.photos/seed/about/600/600" alt="About Me" className="rounded-lg shadow-xl w-full" />
        </div>
        <div className="md:col-span-3 text-lg text-text-secondary space-y-4">
          <p>
            Hello! I'm a dedicated frontend developer with a passion for building intuitive, high-performance web applications. My journey into web development started years ago, and since then, I've been hooked on turning complex problems into elegant, user-friendly solutions.
          </p>
          <p>
            I thrive in collaborative environments and enjoy working with cross-functional teams to bring ideas to life. My expertise lies in the React ecosystem, where I leverage tools like Next.js, Redux, and TypeScript to create robust and scalable applications.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee. I'm always eager to learn and take on new challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
