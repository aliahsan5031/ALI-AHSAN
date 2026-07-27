import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { CustomizationModal } from './components/CustomizationModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Footer } from './components/Footer';
import { Service, UserCustomization } from './types';
import { recordPageView } from './utils/analytics';

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Record page view on load
    recordPageView('Home');

    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [customization, setCustomization] = useState<UserCustomization>({
    brandName: 'Ali Ahsan',
    tagline: 'AI Agent Architect & Autonomous Systems Developer',
    accentColor: '#CD6E4E',
    primaryBg: '#1d1f1e',
    targetAudience: 'Startups & Tech Founders',
    selectedSections: ['home', 'about', 'services', 'projects', 'experience', 'testimonials', 'pricing', 'api-docs', 'contact'],
  });

  const handleSelectService = (service: Service) => {
    setContactPrefill(`Inquiry for Service: ${service.title}\n\nDeliverables requested: ${service.deliverables.join(', ')}`);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName: string) => {
    setContactPrefill(`Inquiry for Pricing Tier: ${planName}\n\nPlease provide scope details and kickoff timeline.`);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSectionVisible = (secId: string) => customization.selectedSections.includes(secId);

  return (
    <div className={`min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col relative transition-colors duration-300 ${
      theme === 'light'
        ? 'light-theme bg-slate-100 text-slate-900'
        : 'bg-[#1d1f1e] text-gray-100'
    }`}>
      {/* Background Granules Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-30 bg-granules mix-blend-overlay" />

      {/* Sidebar (Offcanvas drawer for all screens) */}
      <Sidebar
        onOpenResume={() => {
          setIsResumeOpen(true);
          setIsSidebarOpen(false);
        }}
        onOpenCustomizer={() => {
          setIsCustomizerOpen(true);
          setIsSidebarOpen(false);
        }}
        onBookCall={() => {
          navigateToSection('contact');
          setIsSidebarOpen(false);
        }}
        onOpenAnalytics={() => {
          setIsAnalyticsOpen(true);
          setIsSidebarOpen(false);
        }}
        onOpenApiKeyManager={() => {
          setIsApiKeyModalOpen(true);
          setIsSidebarOpen(false);
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Backdrop for Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] transition-opacity cursor-pointer"
        />
      )}

      {/* Main Content View Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Sections Body */}
        <main className="flex-1">
          {isSectionVisible('home') && (
            <FadeInSection>
              <Hero onNavigate={navigateToSection} />
            </FadeInSection>
          )}
          {isSectionVisible('about') && (
            <FadeInSection>
              <AboutSection />
            </FadeInSection>
          )}
          {isSectionVisible('services') && (
            <FadeInSection>
              <ServicesSection onSelectService={handleSelectService} />
            </FadeInSection>
          )}
          {isSectionVisible('projects') && (
            <FadeInSection>
              <ProjectsSection />
            </FadeInSection>
          )}
          {isSectionVisible('experience') && (
            <FadeInSection>
              <ExperienceSection />
            </FadeInSection>
          )}
          {isSectionVisible('testimonials') && (
            <FadeInSection>
              <TestimonialsSection />
            </FadeInSection>
          )}
          {isSectionVisible('pricing') && (
            <FadeInSection>
              <PricingSection onSelectPlan={handleSelectPlan} />
            </FadeInSection>
          )}
          {isSectionVisible('contact') && (
            <FadeInSection>
              <ContactSection prefilledMessage={contactPrefill} />
            </FadeInSection>
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={navigateToSection} />
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-bold rounded-full shadow-2xl shadow-[#CD6E4E]/30 border border-[#E07E5D] transition-all flex items-center justify-center cursor-pointer group"
            aria-label="Back to top"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CustomizationModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        customization={customization}
        onUpdateCustomization={(updated) => setCustomization(updated)}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </div>
  );
}
