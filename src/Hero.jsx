import { useState, useEffect } from 'react';
import TargetCursor from './TargetCursor';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [nameTransitioned, setNameTransitioned] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [displayedName, setDisplayedName] = useState('');

  useEffect(() => {
    const checkFont = async () => {
      try {
        await document.fonts.load('1em chomsky');
        setTimeout(() => {
          setFontLoaded(true);
        }, 100);
      } catch (error) {
        console.error('Font loading error:', error);
        setTimeout(() => {
          setFontLoaded(true);
        }, 200);
      }
    };

    checkFont();
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;

    const fullName = "Rishabh Rohira";
    const typingSpeed = 100;
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    const transitionTimer = setTimeout(() => {
      setLoadingComplete(true);
    }, 2500);

    const contentTimer = setTimeout(() => {
      setNameTransitioned(true);
    }, 3500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(transitionTimer);
      clearTimeout(contentTimer);
    };
  }, [fontLoaded]);

  useEffect(() => {
    const handleMouseMove = () => {
      setCursorVisible(true);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { once: true });
    window.addEventListener('mouseenter', handleMouseEnter, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      <div style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.2s' }}>
        <TargetCursor 
          spinDuration={3}
          hideDefaultCursor={true}
          parallaxOn={false}
        />
      </div>
      
      <div className={`fixed inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 z-50 transition-all duration-1000 ${
        loadingComplete ? 'opacity-0 pointer-events-none' : 'opacity-0'
      }`} />
      
      <h1 className={`cursor-target fixed font-chomsky text-amber-950 z-40 left-1/2 -translate-x-1/2 text-6xl md:text-7xl lg:text-8xl transition-all duration-1000 ease-out ${
        loadingComplete 
          ? 'top-[15vh]' 
          : 'top-1/2 -translate-y-1/2'
      }`}>
        {displayedName}
        {!loadingComplete && displayedName.length < 15 && <span className="animate-blink">|</span>}
      </h1>
      
      <NewspaperBackground>
        <LandingPage isVisible={nameTransitioned} />
      </NewspaperBackground>
    </>
  );
}

function LandingPage({ isVisible }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const textArray = [
    "Front-End Developer",
    "Valedictorian",
    "Student Leader",
    "That Guy",
  ];
  
  const typingSpeed = 50;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  useEffect(() => {
    if (!isVisible) return;

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
  }, [displayedText, isDeleting, loopNum, isVisible]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center pt-32">
      <div className="max-w-4xl mx-auto">
        <div className={`h-12 mb-8 transition-all duration-700 ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}>
          <p className="text-2xl md:text-3xl font-bigshot text-amber-900">
            {displayedText}
            <span className="animate-blink">|</span>
          </p>
        </div>

        <p className={`text-lg md:text-xl text-amber-800 font-bigshot leading-relaxed mb-12 max-w-2xl mx-auto transition-all duration-700 ease-out delay-[400ms] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}>
          Welcome to my corner of the web. I build beautiful, functional experiences 
          that blend creativity with code. I'm currently crafting digital solutions for
          my high school!
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button className={`cursor-target px-8 py-3 bg-amber-900 text-amber-50 font-bigshot text-lg rounded-lg border-2 border-amber-900 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-900 transition-all duration-700 shadow-lg hover:shadow-xl ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          }`}>
            View Projects
          </button>
          <button className={`cursor-target px-8 py-3 bg-transparent border-2 border-amber-900 text-amber-900 font-bigshot text-lg rounded-lg hover:bg-amber-900 hover:text-amber-50 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          }`}>
            Get in Touch
          </button>
        </div>
        
        <div className={`no-underline flex gap-8 justify-center transition-all duration-700 ease-out delay-[900ms] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}>
          <a href="https://github.com/tzarish" target="_blank" rel="noopener noreferrer" className="cursor-target font-chomsky text-amber-800 hover:text-amber-950 transition-colors duration-300 flex items-center gap-2">
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/rishabh-rohira-5a933b366" target="_blank" rel="noopener noreferrer" className="cursor-target font-chomsky text-amber-800 hover:text-amber-950 transition-colors duration-300 flex items-center gap-2">
            <span>LinkedIn</span>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rrohira93@gmail.com" target="_blank" rel="noopener noreferrer" className="cursor-target font-chomsky text-amber-800 hover:text-amber-950 transition-colors duration-300 flex items-center gap-2">
            <span>Email</span>
          </a>
        </div>
      </div>

      <div className={`absolute bottom-8 left-100 right-10 transition-all duration-700 ease-out delay-[1100ms] ${
        isVisible ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-5'
      }`}>
        <p className="text-amber-800 font-bigshot">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-amber-800 rounded-full mx-auto mt-2 flex justify-center">
          <div className="w-1 h-3 bg-amber-800 rounded-full mt-2"></div>
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