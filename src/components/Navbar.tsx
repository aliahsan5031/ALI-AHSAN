import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoIcon } from './LogoIcon';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onToggleSidebarMobile?: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onToggleSidebarMobile,
  onToggleSidebar,
  isSidebarOpen = false,
}) => {
  const handleToggle = onToggleSidebar ?? onToggleSidebarMobile;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#242625]/90 backdrop-blur-md border-b border-[#383A39] px-4 lg:px-8 py-3.5 flex items-center justify-between relative">
      {/* Left Brand & Sidebar Open Toggle Icon */}
      <div className="flex items-center gap-3">
        {handleToggle && (
          <button
            onClick={handleToggle}
            className={`p-2 text-slate-300 hover:text-white bg-[#1d1f1e] hover:bg-[#2e302f] rounded-lg border border-[#383A39] transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              isSidebarOpen ? 'border-[#CD6E4E] text-[#CD6E4E]' : ''
            }`}
            aria-label="Toggle profile sidebar"
            title={isSidebarOpen ? 'Close Profile Sidebar' : 'Open Profile Sidebar'}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-[#CD6E4E]" />
            ) : (
              <Menu className="w-5 h-5 text-[#CD6E4E]" />
            )}
          </button>
        )}

        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#252827] to-[#161717] border border-[#CD6E4E]/40 flex items-center justify-center shadow-lg shadow-[#CD6E4E]/20 group-hover:border-[#CD6E4E] group-hover:shadow-[#CD6E4E]/35 group-hover:scale-105 transition-all">
            <LogoIcon className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-white tracking-wider flex items-center gap-1">
              ALI <span className="text-[#CD6E4E]">AHSAN</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Agentic AI Engineer
            </span>
          </div>
        </a>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase tracking-widest text-slate-400">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`
              pb-1 transition-colors relative cursor-pointer
              ${
                activeSection === item.id
                  ? 'text-white border-b-2 border-[#CD6E4E]'
                  : 'hover:text-white'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Scroll Progress Bar at bottom of Navbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a1b1a]/80 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#CD6E4E] via-[#E07E5D] to-[#CD6E4E] transition-all duration-150 ease-out shadow-[0_0_8px_#CD6E4E]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

