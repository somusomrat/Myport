import React from 'react';

interface IntroProps {
    name: string;
}

const Intro: React.FC<IntroProps> = ({ name }) => {
    return (
        <div className="bg-primary h-screen flex items-center justify-center">
            <h1 className="text-5xl md:text-8xl font-bold text-white animate-text-focus-in">
                {name}
            </h1>
        </div>
    );
};

export default Intro;
