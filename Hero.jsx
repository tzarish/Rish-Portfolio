import { useState, useEffect } from 'react';
import TargetCursor from './TargetCursor';
import './App.css';

{/*the styling and effects that the user sees first*/ }
function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [nameTransitioned, setNameTransitioned] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [displayedName, setDisplayedName] = useState('');

  useEffect(() => {
    const checkFont = async () => {
      try {
        await document.fonts.load('1em "Chomsky"');
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

      <div className={` inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 z-50 transition-all duration-1000 ${loadingComplete ? 'opacity-0 pointer-events-none' : 'opacity-0'
        }`} />

      <NewspaperBackground>
        <div className="flex flex-col items-center pt-[20vh] pb-0">
          <h1 className="cursor-target font-chomsky text-amber-950 z-40 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
            {displayedName}
            {displayedName.length < 15 && (
              <span className="inline-block w-0.5 h-[0.9em] bg-amber-950 ml-1 animate-cursor-blink align-middle" />
            )}
          </h1>
        </div>

        <LandingPage isVisible={nameTransitioned} />

        <div id="projects">
          <ProjectsSection />
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="border-t border-amber-900/20" />
        </div>

        <EditorialSection />

        <div className="max-w-5xl mx-auto px-4">
          <div className="border-t border-amber-900/20" />
        </div>

        <PersonalitySection />

        <div className="max-w-5xl mx-auto px-4 pb-12 pt-4">
          <div className="border-t-2 border-amber-900/40 pt-4 flex justify-between items-center">
            <span className="font-chomsky text-amber-800 text-lg">Rishabh Rohira</span>
            <span className="font-bigshot text-xs text-amber-600 tracking-widest">EST. 2024</span>
          </div>
        </div>
      </NewspaperBackground>
    </>
  );
}

{/*content the user sees first*/ }

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
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className={`h-12 mb-8 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          }`}>
          <p className="text-xl sm:text-2xl md:text-3xl font-bigshot text-amber-900">
            {displayedText}
            <span className="inline-block w-0.5 h-[0.9em] bg-amber-900 ml-1 animate-cursor-blink align-middle"></span>
          </p>
        </div>

        <p className={`text-base sm:text-lg md:text-xl text-amber-800 font-bigshot leading-relaxed mb-12 max-w-2xl mx-auto transition-all duration-700 ease-out delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          }`}>
          Welcome to my corner of the web. I build beautiful, functional experiences
          that blend creativity with code. I'm currently crafting digital solutions for
          my high school!
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className={`cursor-target px-6 sm:px-8 py-3 bg-amber-900 text-amber-50 font-bigshot text-base sm:text-lg rounded-lg border-2 border-amber-900 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-900 transition-all duration-700 shadow-lg hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}>
            View Projects
          </button>
        </div>

        {/* CONTACT LINKS

        <div className={`no-underline flex flex-wrap gap-6 sm:gap-8 justify-center transition-all duration-700 ease-out delay-[900ms] ${
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
        */}
      </div>

      <div className={`absolute bottom-8 right-20 transition-all duration-700 ease-out delay-[1100ms] ${isVisible ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-5'
        }`}>
        <p className="text-amber-800 font-bigshot text-sm sm:text-base">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-amber-800 rounded-full mx-auto mt-2 flex justify-center">
          <div className="w-1 h-3 bg-amber-800 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}

{/*background effects*/ }

function NewspaperBackground({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }} />

      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-900/10 to-transparent transform rotate-2" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-900/10 to-transparent transform -rotate-1" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="33%" x2="100%" y2="33.8%" stroke="#78350f" strokeWidth="1.5" />
        <line x1="0" y1="67%" x2="100%" y2="66.2%" stroke="#78350f" strokeWidth="1" />
        <line x1="0" y1="0" x2="18%" y2="100%" stroke="#78350f" strokeWidth="0.8" />
        <line x1="100%" y1="0" x2="82%" y2="100%" stroke="#78350f" strokeWidth="0.8" />
        <line x1="40%" y1="48%" x2="60%" y2="52%" stroke="#78350f" strokeWidth="0.6" />
      </svg>

      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(120,53,15,0.08) 100%)'
        }} />

      <div className="absolute top-10 right-20 w-24 h-24 bg-amber-800/5 rounded-full blur-xl" />
      <div className="absolute bottom-32 left-16 w-32 h-32 bg-amber-900/5 rounded-full blur-2xl" />

      <div className="relative min-h-screen">
        {children}
      </div>
    </div>
  );
}

{/*projects section on scroll*/ }

const PROJECTS = [
  {
    issue: "VOL. I — NO. 1",
    date: "AUTUMN 2024",
    kicker: "SPECIAL REPORT",
    headline: "Local Student Builds School Portal That Actually Works",
    deck: "An internal dashboard replaces three legacy spreadsheets and saves administrators 6 hours a week.",
    tag: "React · Node.js · PostgreSQL",
    href: "#",
  },
  {
    issue: "VOL. I — NO. 2",
    date: "WINTER 2024",
    kicker: "TECHNOLOGY",
    headline: "AI-Powered Study Tool Cuts Flashcard Prep Time in Half",
    deck: "Using the OpenAI API, the app generates custom quizzes from any pasted notes in seconds.",
    tag: "Python · FastAPI · OpenAI",
    href: "#",
  },
  {
    issue: "VOL. I — NO. 3",
    date: "SPRING 2025",
    kicker: "DESIGN",
    headline: "A Portfolio So Newspaper It Hurts — In the Best Way",
    deck: "Vintage broadsheet aesthetics meet modern animation on a personal site that refuses to be boring.",
    tag: "React · Tailwind · Vite",
    href: "#",
  },
];

function ProjectsSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <div className="border-t-4 border-b border-amber-900 mb-1 pt-2 pb-1 flex items-baseline justify-between">
        <span className="font-bigshot text-3xl sm:text-4xl text-amber-950">The Works</span>
        <span className="font-bigshot text-xs text-amber-700 tracking-widest uppercase">Projects Edition</span>
      </div>
      <div className="border-t border-amber-900 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-amber-900/20">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            className="cursor-target group px-5 first:pl-0 last:pr-0"
            onClick={() => window.open(p.href, '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bigshot text-[10px] tracking-[0.2em] uppercase text-amber-700">{p.kicker}</span>
              <span className="font-bigshot text-[10px] text-amber-500">{p.issue}</span>
            </div>

            <h2 className="font-bigshot text-xl sm:text-2xl text-amber-950 leading-tight mb-2 group-hover:underline decoration-amber-800 underline-offset-2 transition-all">
              {p.headline}
            </h2>

            <div className="w-full h-px bg-amber-900/20 my-3" />

            <p className="font-bigshot text-sm text-amber-800 leading-relaxed mb-4">
              {p.deck}
            </p>

            <span className="inline-block font-bigshot text-[11px] border border-amber-800 text-amber-800 px-2 py-0.5 rounded tracking-wide group-hover:bg-amber-900 group-hover:text-amber-50 transition-colors">
              {p.tag}
            </span>

            <div className="mt-3 font-bigshot text-[10px] text-amber-500 tracking-widest">{p.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


const SKILLS = {
  "Front-End": ["React", "Tailwind CSS", "JavaScript", "Vite", "Bootstrap", "jQuery", "UI/UX Design"],
  "Tooling": ["Git", "Figma", "VS Code", "Chrome Dev Tools", "API Integration", "Codepen", "npm"],
  "Soft Skills": ["Leadership", "Team Building & Coordination"],
};

function EditorialSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="border-t-4 border-b border-amber-900 mb-1 pt-2 pb-1 flex items-baseline justify-between">
        <span className="font-bigshot text-3xl sm:text-4xl text-amber-950">The Skill Index</span>
        <span className="font-bigshot text-xs text-amber-700 tracking-widest uppercase">Editorial</span>
      </div>
      <div className="border-t border-amber-900 mb-10" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-bigshot text-lg text-amber-950 border-b border-amber-800/30 pb-1 mb-3">{category}</h3>
            <ul className="space-y-1">
              {items.map(skill => (
                <li key={skill} className="font-bigshot text-sm text-amber-800 flex items-start gap-1.5">
                  <span className="text-amber-500 mt-0.5">›</span>{skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


const OPINIONS = [
  { pull: "Clean code is a love letter to your future self.", attr: "— On craft" },
  { pull: "Design is communication.", attr: "— On aesthetics" },
  { pull: "Ship it, then make it perfect.", attr: "— On momentum" },
];

function PersonalitySection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="border-t-4 border-b border-amber-900 mb-1 pt-2 pb-1 flex items-baseline justify-between">
        <span className="font-bigshot text-3xl sm:text-4xl text-amber-950">Op-Ed</span>
        <span className="font-bigshot text-xs text-amber-700 tracking-widest uppercase">The Human Behind the Code</span>
      </div>
      <div className="border-t border-amber-900 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="font-bigshot text-base text-amber-800 leading-relaxed mb-4">
            I'm Rishabh. I believe technology is most powerful when it
            feels invisible. The best interface is the one you forget you're using.
            I would never get into predatory JavaScript frameworks, but I do have a soft spot for a well-placed hover effect or a perfectly timed animation.
            If you like what you see, feel free to reach out. I'm always excited to collaborate on a project, swap design tips, or just chat about the latest tech trends.
          </p>
          <p className="font-bigshot text-base text-amber-800 leading-relaxed">
            Outside the editor, I'm probably convincing someone that serif fonts are underrated, trying to pet a dog, or strumming my guitar.
            I love collaborating on projects that blend creativity with code, and I'm always down to chat about new ideas or opportunities.
          </p>
        </div>

        <div className="space-y-6 border-l border-amber-900/20 pl-8">
          {OPINIONS.map(({ pull, attr }) => (
            <blockquote key={attr}>
              <p className="font-bigshot text-xl text-amber-950 leading-snug mb-1">"{pull}"</p>
              <cite className="font-bigshot text-xs text-amber-600 not-italic tracking-widest uppercase">{attr}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;