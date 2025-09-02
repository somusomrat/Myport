import React, { useState, useRef } from 'react';

interface AboutProps {
  isEditing: boolean;
}

const initialContent = {
  img: "https://picsum.photos/seed/about/600/600",
  p1: "Hello! I'm a dedicated frontend developer with a passion for building intuitive, high-performance web applications. My journey into web development started years ago, and since then, I've been hooked on turning complex problems into elegant, user-friendly solutions.",
  p2: "I thrive in collaborative environments and enjoy working with cross-functional teams to bring ideas to life. My expertise lies in the React ecosystem, where I leverage tools like Next.js, Redux, and TypeScript to create robust and scalable applications.",
  p3: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee. I'm always eager to learn and take on new challenges."
}

const About: React.FC<AboutProps> = ({ isEditing }) => {
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('portfolio-about');
    return savedContent ? JSON.parse(savedContent) : initialContent;
  });

  React.useEffect(() => {
    localStorage.setItem('portfolio-about', JSON.stringify(content));
  }, [content]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (field: string, value: string) => {
    setContent(prev => ({...prev, [field]: value}));
  }

  return (
    <section id="about" className="py-24 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">About Me</h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 relative group">
          <img src={content.img} alt="About Me" className="rounded-lg shadow-xl w-full" />
          {isEditing && (
              <div 
                className="absolute inset-0 rounded-lg bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <span>Upload Image</span>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
          )}
        </div>
        <div className="md:col-span-3 text-lg text-text-secondary space-y-4">
          {isEditing ? (
            <>
              <textarea value={content.p1} onChange={(e) => handleTextChange('p1', e.target.value)} className="w-full h-32 bg-secondary border border-dashed border-gray-500 rounded-md p-2 focus:outline-none focus:border-accent resize-none"/>
              <textarea value={content.p2} onChange={(e) => handleTextChange('p2', e.target.value)} className="w-full h-32 bg-secondary border border-dashed border-gray-500 rounded-md p-2 focus:outline-none focus:border-accent resize-none"/>
              <textarea value={content.p3} onChange={(e) => handleTextChange('p3', e.target.value)} className="w-full h-32 bg-secondary border border-dashed border-gray-500 rounded-md p-2 focus:outline-none focus:border-accent resize-none"/>
            </>
          ) : (
            <>
              <p>{content.p1}</p>
              <p>{content.p2}</p>
              <p>{content.p3}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;