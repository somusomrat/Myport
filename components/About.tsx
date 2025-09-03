import React, { useRef, useState } from 'react';
import type { AboutContent } from '../types';
import { SpinnerIcon } from './Icons';

interface AboutProps {
  isEditing: boolean;
  content: AboutContent;
  setContent: (content: AboutContent) => void;
}

const About: React.FC<AboutProps> = ({ isEditing, content, setContent }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // This is a public, free-to-use API key for imgbb.
  const IMGBB_API_KEY = 'd70457833a251b14a2754388439e7b2f';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const result = await response.json();
      if (result.data && result.data.url) {
        setContent({ ...content, img: result.data.url });
      } else {
        throw new Error('Image URL not found in response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try another image or try again later.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextChange = (field: keyof AboutContent, value: string) => {
    setContent({ ...content, [field]: value });
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
           {isUploading && (
             <div className="absolute inset-0 rounded-lg bg-black/80 flex items-center justify-center text-white">
                <SpinnerIcon />
             </div>
           )}
          {isEditing && !isUploading && (
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