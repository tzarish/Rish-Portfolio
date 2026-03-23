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

      <MastheadNav />

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

        <div className="max-w-5xl mx-auto px-4">
          <div className="border-t border-amber-900/20" />
        </div>

        <ContactSection />

        <div className="max-w-5xl mx-auto px-4 pb-12 pt-4">
          <div className="border-t-2 border-amber-900/40 pt-4 flex justify-between items-center">
            <span className="font-chomsky text-amber-800 text-lg">Love Always, Rishabh Rohira</span>
            <span className="font-bigshot text-xs text-amber-600 tracking-widest">EST. 2024</span>
          </div>
        </div>
      </NewspaperBackground>

      <BackToTopButton />
    </>
  );
}

function MastheadNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-amber-50/95 backdrop-blur-sm shadow-sm'
        : 'bg-amber-50/80 backdrop-blur-sm'
    }`}>

      <div className="h-0.5 bg-amber-900/70" />

      <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">

        <div className="hidden sm:flex items-center gap-6">
          {[
            { label: 'Projects', id: 'projects' },
            { label: 'Skills',   id: 'skills'   },
            { label: 'About',    id: 'about'    },
            { label: 'Contact',  id: 'contact'  },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="cursor-target font-bigshot text-[11px] tracking-widest uppercase text-white hover:text-amber-500 transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-900 group-hover:w-full transition-all duration-200" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {[
            { label: 'GitHub',   href: 'https://github.com/tzarish' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishabh-rohira-5a933b366' },
            { label: 'Email',    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rrohira93@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target font-bigshot text-[11px] tracking-widest uppercase text-amber-700 hover:text-amber-950 transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-900 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </div>
      </div>

      <div className="h-px bg-amber-900/25" />
    </nav>
  );
}

{/*back to top button*/ }
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 left-8 z-50 flex flex-col items-center gap-1 font-bigshot text-[10px] text-white uppercase transition-all duration-500 animate-bounce ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="w-6 h-10 border-2 border-amber-800 rounded-full flex justify-center relative">
        <div className="w-1 h-3 bg-amber-800 rounded-full mt-2" style={{ animationDirection: 'normal' }} />
      </div>
      <span>Back to top</span>
    </button>
  );
}

{/*content the user sees first*/ }

function LandingPage({ isVisible }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [atTop, setAtTop] = useState(true);

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

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
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
          that blend creativity with code. I design interfaces that increase user accessibility by at least 40%.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className={`cursor-target px-6 sm:px-8 py-3 bg-amber-900 text-amber-50 font-bigshot text-base sm:text-lg rounded-lg border-2 border-amber-900 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-900 transition-all duration-700 shadow-lg hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}>
            View Projects
          </button>
        </div>

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
      </div>

      <div className={`fixed bottom-8 right-20 z-40 flex flex-col items-center gap-2 transition-all duration-500 animate-bounce ${
        isVisible && atTop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}>
        <p className="text-amber-800 font-bigshot text-sm sm:text-base">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-amber-800 rounded-full mx-auto flex justify-center">
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
    date: "SPRING 2025",
    kicker: "SPECIAL REPORT",
    headline: "Local Student Rebuilding School Website That Actually Works",
    deck: "A deep dive into the tech stack and design choices behind the project that's saving the day for the school's digital presence.",
    tag: "Peer Reviewed · Vanilla · Figma",
    href: "https://decax-studios.github.io/CTE-Website/",
  },
  {
    issue: "VOL. I — NO. 2",
    date: "FALL 2025",
    kicker: "TECHNOLOGY",
    headline: "Collaborative Mock Japanese Restaurant Website with Advanced Features",
    deck: "A team effort to build a responsive, accessible, and visually stunning mock restaurant website using modern web technologies.",
    tag: "Parallax Scrolling · Accessible Carousel · Vanilla",
    href: "https://tzarish.github.io/Fuji-Kitchen/",
  },
  {
    issue: "VOL. I — NO. 3",
    date: "FALL 2025",
    kicker: "DESIGN",
    headline: "A Clothing Brand So Niche That It Only Exists on the Internet",
    deck: "Award-winning design project that combines streetwear aesthetics with cutting-edge web design to create a unique online shopping experience.",
    tag: "Vanilla · Bootstrap · Collaborative",
    href: "https://tzarish.github.io/Urban-Pulse-Streetwear/",
  },
  {
    issue: "VOL. I — NO. 4",
    date: "WINTER 2025",
    kicker: "OPINION",
    headline: "Jamstack: You're Worth Serving For",
    deck: "A music player website dedicated towards exploring backend code with a focus on performance, scalability, and developer experience.",
    tag: "Web Dev · Performance · Trending Music",
    href: "https://tzarish.github.io/Jamstack/",
  }
];

function ProjectsSection() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-20">
      <div className="border-t-4 border-b border-amber-900 mb-1 pt-2 pb-1 flex items-baseline justify-between">
        <span className="font-bigshot text-3xl sm:text-4xl text-amber-950">The Works</span>
        <span className="font-bigshot text-xs text-amber-700 tracking-widest uppercase">Projects Edition</span>
      </div>
      <div className="border-t border-amber-900 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            className={`cursor-target group px-5 ${i % 3 === 0 ? 'pl-0' : ''} ${i % 3 === 2 ? 'pr-0' : ''} ${(i + 1) % 3 !== 0 && i !== PROJECTS.length - 1 ? 'md:border-r border-amber-900/20' : ''}`}
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
    <section id="skills" className="max-w-5xl mx-auto px-4 py-16">
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
    <section id="about" className="max-w-5xl mx-auto px-4 py-16">
      <div className="border-t-4 border-b border-amber-900 mb-1 pt-2 pb-1 flex items-baseline justify-between">
        <span className="font-bigshot text-3xl sm:text-4xl text-amber-950">Op-Ed</span>
        <span className="font-bigshot text-xs text-amber-700 tracking-widest uppercase">The Human Behind the Code</span>
      </div>
      <div className="border-t border-amber-900 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="font-bigshot text-base text-amber-800 leading-relaxed mb-4">
            I believe technology is most powerful when it
            feels invisible.
            Outside the editor, I'm attending internships or strumming my guitar.
            I'm always down to chat about new ideas or opportunities.
            
          </p>
          <p className="font-bigshot text-base text-amber-800 leading-relaxed">
            I'm actually getting into electrical engineering and how it can be integrated with software,
            so if you have any insight or tips, please do reach out!
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

{/* contact */}
function ContactSection() {
  const contacts = [
    {
      label: 'GitHub',
      description: 'See the code behind the curtain',
      href: 'https://github.com/tzarish',
      kicker: 'SOURCE',
    },
    {
      label: 'LinkedIn',
      description: 'Connect professionally',
      href: 'https://www.linkedin.com/in/rishabh-rohira-5a933b366',
      kicker: 'NETWORK',
    },
    {
      label: 'Email',
      description: 'rrohira93@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rrohira93@gmail.com',
      kicker: 'DIRECT',
    },
  ];

  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 py-16">
      <div className="border-t-4 border-b border-amber-900 mb-1 pt-2 pb-1 flex items-baseline justify-between">
        <span className="font-bigshot text-3xl sm:text-4xl text-amber-950">Letters to the Editor</span>
        <span className="font-bigshot text-xs text-amber-700 tracking-widest uppercase">Get in Touch</span>
      </div>
      <div className="border-t border-amber-900 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="font-bigshot text-base text-amber-800 leading-relaxed mb-2">
            Want to collaborate, ask a question, or just say hello?
            I read every message and respond within a day. Seriously, try me.
          </p>
          <p className="font-bigshot text-sm text-amber-600 leading-relaxed">
            Whether it's a quick question or a big idea, my inbox is always open.
          </p>
        </div>

        <div className="divide-y divide-amber-900/15">
          {contacts.map(({ label, description, href, kicker }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target group flex items-start justify-between py-4 first:pt-0 last:pb-0 hover:pl-1 transition-all duration-200"
            >
              <div>
                <span className="font-bigshot text-[10px] tracking-[0.2em] uppercase text-amber-500 block mb-0.5">{kicker}</span>
                <span className="font-bigshot text-lg text-amber-950 group-hover:underline decoration-amber-800 underline-offset-2">
                  {label}
                </span>
                <span className="font-bigshot text-xs text-amber-600 block mt-0.5">{description}</span>
              </div>
              <span className="font-chomsky text-amber-400 group-hover:text-amber-800 text-xl mt-1 transition-colors duration-200">›</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;