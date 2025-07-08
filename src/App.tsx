import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Mail, FileText, Info, Eye, EyeOff, Home, User, Briefcase, Award, MessageCircle } from 'lucide-react';
import FuzzyText from './FuzzyText';
import ScrollVelocity from './ScrollVelocity';
import MusicPlayer from './MusicPlayer';
import Onboarding from './Onboarding';

type Section = 'home' | 'about' | 'projects' | 'certificates' | 'contact';
type Language = 'id' | 'en';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [navigationVisible, setNavigationVisible] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
      // Load saved preferences
      const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
      const savedMusicEnabled = localStorage.getItem('music-enabled') === 'true';
      const savedLanguage = localStorage.getItem('language') as Language || 'id';
      setDarkMode(savedDarkMode);
      setMusicEnabled(savedMusicEnabled);
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const handleOnboardingComplete = (preferences: { darkMode: boolean; musicEnabled: boolean }) => {
    setDarkMode(preferences.darkMode);
    setMusicEnabled(preferences.musicEnabled);
    setShowOnboarding(false);
    
    // Save preferences to localStorage
    localStorage.setItem('onboarding-completed', 'true');
    localStorage.setItem('dark-mode', preferences.darkMode.toString());
    localStorage.setItem('music-enabled', preferences.musicEnabled.toString());
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('dark-mode', newDarkMode.toString());
  };

  const toggleNavigation = () => {
    setNavigationVisible(!navigationVisible);
  };

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Language content
  const content = {
    id: {
      // Navigation tooltips
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      certificates: 'Sertifikat',
      contact: 'Kontak',
      github: 'GitHub',
      downloadCV: 'Unduh CV',
      email: 'Email',
      hideNav: 'Sembunyikan Navigasi',
      showNav: 'Tampilkan Navigasi',
      
      // Main content
      availableForHire: 'Tersedia untuk Disewa',
      subtitle: ['DEVELOPER FULL STACK MULTI-SKILLED', '& PENGGEMAR CYBERSECURITY BERBASIS DI INDONESIA'],
      
      // About section
      aboutTitle: 'TENTANG',
      backgroundTitle: 'Latar Belakang',
      backgroundText1: 'Saya adalah seorang full-stack developer yang berpengalaman dengan keahlian dalam teknologi web modern dan cybersecurity. Berbasis di Indonesia, saya menciptakan aplikasi yang kuat dan scalable sambil mempertahankan standar keamanan tertinggi.',
      backgroundText2: 'Perjalanan saya mencakup dari pengembangan frontend dengan React dan TypeScript hingga sistem backend dengan Node.js dan Python, dilengkapi dengan pemahaman mendalam tentang prinsip-prinsip cybersecurity.',
      skillsTitle: 'Keahlian',
      frontend: 'Frontend',
      backend: 'Backend',
      cybersecurity: 'Cybersecurity',
      frontendSkills: 'React, TypeScript, Next.js, Tailwind CSS',
      backendSkills: 'Node.js, Python, Express, FastAPI',
      cybersecuritySkills: 'Penetration Testing, Vulnerability Assessment, Security Auditing',
      
      // Projects section
      projectsTitle: 'PROYEK',
      
      // Certificates section
      certificatesTitle: 'SERTIFIKAT',
      
      // Contact section
      contactTitle: 'KONTAK',
      getInTouch: 'Mari Berkenalan',
      contactText: 'Saya selalu tertarik dengan peluang dan kolaborasi baru. Jangan ragu untuk menghubungi saya jika Anda ingin bekerja sama.',
      emailLabel: 'Email',
      githubLabel: 'GitHub'
    },
    en: {
      // Navigation tooltips
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      certificates: 'Certificates',
      contact: 'Contact',
      github: 'GitHub',
      downloadCV: 'Download CV',
      email: 'Email',
      hideNav: 'Hide Navigation',
      showNav: 'Show Navigation',
      
      // Main content
      availableForHire: 'Available for Hire',
      subtitle: ['A MULTI-SKILLED FULL STACK DEVELOPER', '& CYBERSECURITY ENTHUSIAST BASED IN INDONESIA'],
      
      // About section
      aboutTitle: 'ABOUT',
      backgroundTitle: 'Background',
      backgroundText1: 'I\'m a passionate full-stack developer with expertise in modern web technologies and cybersecurity. Based in Indonesia, I create robust, scalable applications while maintaining the highest security standards.',
      backgroundText2: 'My journey spans from frontend development with React and TypeScript to backend systems with Node.js and Python, complemented by my deep understanding of cybersecurity principles.',
      skillsTitle: 'Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      cybersecurity: 'Cybersecurity',
      frontendSkills: 'React, TypeScript, Next.js, Tailwind CSS',
      backendSkills: 'Node.js, Python, Express, FastAPI',
      cybersecuritySkills: 'Penetration Testing, Vulnerability Assessment, Security Auditing',
      
      // Projects section
      projectsTitle: 'PROJECTS',
      
      // Certificates section
      certificatesTitle: 'CERTIFICATES',
      
      // Contact section
      contactTitle: 'CONTACT',
      getInTouch: 'Get in Touch',
      contactText: 'I\'m always interested in new opportunities and collaborations. Feel free to reach out if you\'d like to work together.',
      emailLabel: 'Email',
      githubLabel: 'GitHub'
    }
  };

  const t = content[language];

  return (
    <>
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-[#121212] text-[#EAEAEA]' : 'bg-[#E4DED5] text-[#1A1A1A]'
    }`}>
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Header */}
        <header className="relative px-6 py-8 md:px-12 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Vertical Navigation - Behind Header Text */}
            <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-500 ${
              navigationVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
            }`}>
              <div className={`flex flex-col space-y-2 p-2 rounded-xl backdrop-blur-md transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/5 border border-white/5' 
                  : 'bg-white/30 border border-black/5'
              }`}>
                {/* Navigation Items */}
                <button
                  onClick={() => setActiveSection('home')}
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeSection === 'home'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="Home"
                >
                  <Home size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    Home
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('about')}
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeSection === 'about'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="About"
                >
                  <User size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    About
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('projects')}
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeSection === 'projects'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="Projects"
                >
                  <Briefcase size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    Projects
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('certificates')}
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeSection === 'certificates'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="Certificates"
                >
                  <Award size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    Certificates
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('contact')}
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeSection === 'contact'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="Contact"
                >
                  <MessageCircle size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    Contact
                  </div>
                </button>

                {/* Divider */}
                <div className={`w-full h-px my-1 ${darkMode ? 'bg-white/15' : 'bg-black/15'}`}></div>

                {/* Social Links */}
                <a
                  href="https://github.com/jaa2006"
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'hover:bg-white/8 text-white/60 hover:text-white'
                      : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="GitHub"
                >
                  <Github size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    GitHub
                  </div>
                </a>

                <a
                  href="/Putih Netral Minimalis Profesional CV Resume.pdf"
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'hover:bg-white/8 text-white/60 hover:text-white'
                      : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="Download CV"
                >
                  <FileText size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    Download CV
                  </div>
                </a>
                <a
                  href="mailto:gamingdzul5@gmail.com"
                  className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'hover:bg-white/8 text-white/60 hover:text-white'
                      : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                  title="Email"
                >
                  <Mail size={16} />
                  <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    darkMode ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
                  }`}>
                    Email
                  </div>
                </a>
              </div>
            </div>

            {/* Top Navigation */}
            <nav className="relative z-20 flex justify-between items-center mb-8">
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleLanguage('id')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                    language === 'id'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                    language === 'en'
                      ? darkMode 
                        ? 'bg-white/15 text-white' 
                        : 'bg-black/15 text-black'
                      : darkMode
                        ? 'hover:bg-white/8 text-white/60 hover:text-white'
                        : 'hover:bg-black/8 text-black/60 hover:text-black'
                  }`}
                >
                  EN
                </button>
              </div>
              <div className="flex items-center space-x-4">
                {/* Music Player Button */}
                <MusicPlayer darkMode={darkMode} autoPlay={musicEnabled} />
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={toggleNavigation}
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
                  title={navigationVisible ? t.hideNav : t.showNav}
                >
                  {navigationVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </nav>

            {/* Main Content */}
            {activeSection === 'home' && (
              <div className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden">
                {/* Available for Hire */}
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl font-serif italic opacity-70">
                    {t.availableForHire}
                  </p>
                </div>

                {/* Main Title - Bold and Large */}
                <div className="text-center relative z-10 mb-16">
                  <div className="flex flex-col items-center space-y-4">
                    <FuzzyText 
                      baseIntensity={0.2} 
                      hoverIntensity={0.5} 
                      enableHover={true}
                      fontSize="clamp(4rem, 12vw, 12rem)"
                      fontWeight={900}
                      fontFamily="Space Grotesk"
                      color={darkMode ? "#EAEAEA" : "#1A1A1A"}
                    >
                      ZULFIKAR
                    </FuzzyText>
                    <FuzzyText 
                      baseIntensity={0.2} 
                      hoverIntensity={0.5} 
                      enableHover={true}
                      fontSize="clamp(4rem, 12vw, 12rem)"
                      fontWeight={900}
                      fontFamily="Space Grotesk"
                      color={darkMode ? "#EAEAEA" : "#1A1A1A"}
                    >
                      SANDIRA
                    </FuzzyText>
                  </div>
                </div>

                {/* Character GIF - Positioned to overlap title */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="relative transform translate-y-4">
                    <img
                      src="/Standard-Mode-buat-character-i-unscreen (1).gif"
                      alt="Zulfikar Sandira - Developer Character"
                      className="w-72 md:w-80 lg:w-96 xl:w-[28rem] h-auto transition-transform duration-300 hover:scale-105 pointer-events-auto"
                      style={{ 
                        filter: darkMode ? 'brightness(0.95) contrast(1.05) drop-shadow(0 20px 40px rgba(0,0,0,0.3))' : 'brightness(1.05) contrast(1.02) drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                        imageRendering: 'crisp-edges'
                      }}
                    />
                    {/* Character glow effect */}
                    <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-30 ${
                      darkMode 
                        ? 'bg-gradient-radial from-white/20 via-transparent to-transparent' 
                        : 'bg-gradient-radial from-black/10 via-transparent to-transparent'
                    }`}></div>
                  </div>
                </div>

                {/* Subtitle - Split layout */}
                <div className="relative z-30 mt-auto mb-12">
                  <div className="max-w-7xl mx-auto">
                    <ScrollVelocity
                      texts={t.subtitle} 
                      velocity={50}
                      className="text-xs md:text-sm lg:text-base font-bold tracking-wide opacity-80"
                      scrollerClassName="!text-xs md:!text-sm lg:!text-base !font-bold !tracking-wide"
                      numCopies={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'about' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-center">{t.aboutTitle}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{t.backgroundTitle}</h3>
                    <p className="text-lg leading-relaxed mb-6 opacity-80">
                      {t.backgroundText1}
                    </p>
                    <p className="text-lg leading-relaxed opacity-80">
                      {t.backgroundText2}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{t.skillsTitle}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{t.frontend}</h4>
                        <p className="opacity-80">{t.frontendSkills}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t.backend}</h4>
                        <p className="opacity-80">{t.backendSkills}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t.cybersecurity}</h4>
                        <p className="opacity-80">{t.cybersecuritySkills}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">{t.projectsTitle}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "SMK Al-Amah Sindulang Website",
                      description: language === 'id' ? "Website resmi sekolah SMK Al-Amah Sindulang dengan sistem informasi lengkap" : "Official website for SMK Al-Amah Sindulang school with complete information system",
                      tech: "React, TypeScript, Tailwind CSS",
                      link: "https://smkalamahsindulang.sch.id/",
                      image: "/Screenshot (181).png"
                    },
                    {
                      title: "Scan.in - QR Scanner",
                      description: language === 'id' ? "Aplikasi web untuk scan QR code dengan interface yang modern dan responsif" : "Web application for QR code scanning with modern and responsive interface",
                      tech: "React, JavaScript, QR Scanner API",
                      link: "https://scan-in.vercel.app/",
                      image: "/Screenshot (182).png"
                    },
                    {
                      title: "FixCode QR Generator",
                      description: language === 'id' ? "Generator QR code dengan fitur kustomisasi warna dan format export" : "QR code generator with color customization and export format features",
                      tech: "React, TypeScript, QR Code Library",
                      link: "https://fixcode-qr-generator.vercel.app/",
                      image: "/Screenshot (183).png"
                    },
                    {
                      title: "FixCode GameSpot - Valorant Platform",
                      description: language === 'id' ? "Platform gaming untuk komunitas Valorant dengan AI chat dan fitur interaktif" : "Gaming platform for Valorant community with AI chat and interactive features",
                      tech: "React, AI Integration, Gaming API",
                      link: "https://fixcodegamespott.vercel.app/",
                      image: "/Screenshot (184).png"
                    },
                    {
                      title: "AppsenzV2 - GPS Attendance System",
                      description: language === 'id' ? "Sistem absensi digital berbasis GPS dengan tracking lokasi real-time" : "GPS-based digital attendance system with real-time location tracking",
                      tech: "React, GPS API, Node.js, Database",
                      link: "https://appsenzv2.vercel.app/login",
                      image: "/image.png"
                    },
                    {
                      title: "Karang Taruna Website",
                      description: language === 'id' ? "Website organisasi Karang Taruna dengan sistem manajemen kegiatan" : "Karang Taruna organization website with activity management system",
                      tech: "React, TypeScript, CMS",
                      link: "#",
                      image: "/image.png"
                    }
                  ].map((project, index) => (
                    <div key={index} className="group cursor-pointer" onClick={() => project.link !== '#' && window.open(project.link, '_blank')}>
                      <div className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                        darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/40 hover:bg-white/60'
                      }`}>
                        {/* Project Image */}
                        <div className="mb-4 overflow-hidden rounded-lg">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-opacity">
                          {project.title}
                        </h3>
                        <p className="opacity-80 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <p className="text-sm font-medium opacity-60">
                          {project.tech}
                        </p>
                        {project.link !== '#' && (
                          <div className="mt-4 flex items-center text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                            <span>{language === 'id' ? 'Lihat Project' : 'View Project'}</span>
                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'certificates' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">{t.certificatesTitle}</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Certified Ethical Hacker (CEH)",
                      issuer: "EC-Council",
                      year: "2024"
                    },
                    {
                      title: "AWS Certified Solutions Architect",
                      issuer: "Amazon Web Services",
                      year: "2023"
                    },
                    {
                      title: "Certified Information Systems Security Professional (CISSP)",
                      issuer: "(ISC)²",
                      year: "2023"
                    },
                    {
                      title: "React Developer Certification",
                      issuer: "Meta",
                      year: "2022"
                    },
                    {
                      title: "CompTIA Security+",
                      issuer: "CompTIA",
                      year: "2022"
                    }
                  ].map((cert, index) => (
                    <div key={index} className={`p-6 rounded-lg ${
                      darkMode ? 'bg-white/5' : 'bg-white/40'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                          <p className="opacity-80">{cert.issuer}</p>
                        </div>
                        <span className="text-sm opacity-60 font-medium">{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-12">{t.contactTitle}</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{t.getInTouch}</h3>
                    <p className="text-lg opacity-80 mb-8">
                      {t.contactText}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <a
                      href="mailto:gamingdzul5@gmail.com"
                      className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                        darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    >
                      <Mail className="w-8 h-8 mx-auto mb-4 opacity-80" />
                      <h4 className="font-semibold mb-2">{t.emailLabel}</h4>
                      <p className="opacity-80">gamingdzul5@gmail.com</p>
                    </a>
                    
                    <a
                      href="https://github.com/jaa2006"
                      className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                        darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    >
                      <Github className="w-8 h-8 mx-auto mb-4 opacity-80" />
                      <h4 className="font-semibold mb-2">{t.githubLabel}</h4>
                      <p className="opacity-80">github.com/jaa2006</p>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Footer */}
        {/* Copyright Footer */}
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
          navigationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <div className="text-center">
            <p className="text-xs opacity-50">
              © 2024 Zulfikar Sandira. All rights reserved.
            </p>
          </div>
        </div>

        {/* Social Links - Top Right */}

      </div>
    </div>
    </>
  );
}

export default App;