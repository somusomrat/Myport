
import React from 'react';
import { PROFILE } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Get In Touch</h2>
         <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
      </div>
      <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
        I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to say hi, feel free to reach out!
      </p>
      <a
        href={`mailto:${PROFILE.email}`}
        className="inline-block bg-accent text-primary text-lg font-semibold py-4 px-10 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
      >
        Say Hello
      </a>
    </section>
  );
};

export default Contact;