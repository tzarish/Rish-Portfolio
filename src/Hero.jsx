import { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <NewspaperBackground>
      <LandingPage />
    </NewspaperBackground>
  );
}

function LandingPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const textArray = [
    "Front-End Developer",
    "Valedictorian",
    "Student Leader",
    "That Guy"
  ];
  
  const typingSpeed = 50;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textArray.length;
      const fullText = textArray[current];

      if (!isDeleting) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(fullText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="cursor-default text-6xl md:text-7xl lg:text-8xl font-chomsky text-amber-950 mb-6 animate-fadeIn">
          Rishabh Rohira
        </h1>

        <div className="h-12 mb-8">
          <p className="cursor-default text-2xl md:text-3xl font-serif text-amber-900">
            {displayedText}
            <span className="animate-blink">|</span>
          </p>
        </div>

        <p className="cursor-default text-lg md:text-xl text-amber-800 font-serif leading-relaxed mb-12 max-w-2xl mx-auto">
          Welcome to my corner of the web. I build beautiful, functional experiences 
          that blend creativity with code. Currently crafting digital solutions for
          my high school!
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button className="px-8 py-3 bg-amber-900 text-amber-50 font-serif text-lg rounded-lg hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl">
            View Projects
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-amber-900 text-amber-900 font-serif text-lg rounded-lg hover:bg-amber-900 hover:text-amber-50 transition-all duration-300">
            Get in Touch
          </button>
        </div>
        
        <div className="flex gap-8 justify-center text-amber-800">
          <a href="#" className="font-serif hover:text-amber-950 transition-colors duration-300 flex items-center gap-2">
            <span>GitHub</span>
          </a>
          <a href="#" className="font-serif hover:text-amber-950 transition-colors duration-300 flex items-center gap-2">
            <span>LinkedIn</span>
          </a>
          <a href="#" className="font-serif hover:text-amber-950 transition-colors duration-300 flex items-center gap-2">
            <span>Email</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <p className="text-amber-800 font-serif text-sm">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-amber-800 rounded-full mx-auto mt-2 flex justify-center">
          <div className="w-1 h-3 bg-amber-800 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function NewspaperBackground({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
             mixBlendMode: 'multiply'
           }}>
      </div>

      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-900/10 to-transparent transform rotate-2"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-900/10 to-transparent transform -rotate-1"></div>

      <div className="absolute top-10 right-20 w-24 h-24 bg-amber-800/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-16 w-32 h-32 bg-amber-900/5 rounded-full blur-2xl"></div>

      <div className="relative min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default App;