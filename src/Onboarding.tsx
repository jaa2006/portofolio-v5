import React, { useState } from 'react';
import { Moon, Sun, Music, Zap } from 'lucide-react';

interface OnboardingProps {
  onComplete: (preferences: { darkMode: boolean; musicEnabled: boolean }) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const steps = [
    {
      title: "Pilih mode terang atau mode gelap cuy",
      subtitle: "Sesuaikan tampilan sesuai preferensi kamu",
      content: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setDarkMode(false);
              setCurrentStep(1);
            }}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'border-white/20 bg-white/5 hover:bg-white/10' 
                : 'border-black/20 bg-white/40 hover:bg-white/60'
            }`}
          >
            <Sun className="w-12 h-12 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <p className="font-medium text-lg">Mode Terang</p>
            <p className="text-sm opacity-70 mt-1">Cerah dan fresh</p>
          </button>
          
          <button
            onClick={() => {
              setDarkMode(true);
              setCurrentStep(1);
            }}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'border-white/20 bg-white/5 hover:bg-white/10' 
                : 'border-black/20 bg-white/40 hover:bg-white/60'
            }`}
          >
            <Moon className="w-12 h-12 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <p className="font-medium text-lg">Mode Gelap</p>
            <p className="text-sm opacity-70 mt-1">Elegan dan nyaman</p>
          </button>
        </div>
      )
    },
    {
      title: "Hidupkan music untuk pengalaman yang lebih epic dan mengkeceee",
      subtitle: "Nikmati background music yang keren sambil explore portfolio",
      content: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setMusicEnabled(true);
              setCurrentStep(2);
            }}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'border-white/20 bg-white/5 hover:bg-white/10' 
                : 'border-black/20 bg-white/40 hover:bg-white/60'
            }`}
          >
            <Music className="w-12 h-12 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <p className="font-medium text-lg">Ya, hidupkan!</p>
            <p className="text-sm opacity-70 mt-1">Biar makin seru</p>
          </button>
          
          <button
            onClick={() => {
              setMusicEnabled(false);
              setCurrentStep(2);
            }}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'border-white/20 bg-white/5 hover:bg-white/10' 
                : 'border-black/20 bg-white/40 hover:bg-white/60'
            }`}
          >
            <div className="w-12 h-12 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className={`w-8 h-8 rounded-full border-2 ${darkMode ? 'border-white/60' : 'border-black/60'}`}></div>
            </div>
            <p className="font-medium text-lg">Nanti aja</p>
            <p className="text-sm opacity-70 mt-1">Mode hening</p>
          </button>
        </div>
      )
    },
    {
      title: "Kamu siap buat menyelam lebih dalam ke developer pulstek kece ini",
      subtitle: "Semua udah siap, waktunya explore portfolio yang epic!",
      content: (
        <div className="text-center">
          <button
            onClick={() => onComplete({ darkMode, musicEnabled })}
            className={`group relative px-8 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'border-white/20 bg-white/5 hover:bg-white/10' 
                : 'border-black/20 bg-white/40 hover:bg-white/60'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-medium text-xl">Yoi gass bang!!</span>
            </div>
          </button>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-500 ${
      darkMode ? 'bg-[#121212] text-[#EAEAEA]' : 'bg-[#E4DED5] text-[#1A1A1A]'
    }`}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? darkMode ? 'bg-white/80' : 'bg-black/80'
                    : darkMode ? 'bg-white/20' : 'bg-black/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {currentStepData.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-serif italic opacity-70 leading-relaxed">
            {currentStepData.subtitle}
          </p>

          {/* Content */}
          <div className="mt-12">
            {currentStepData.content}
          </div>
        </div>

        {/* Skip Option (only on first two steps) */}
        {currentStep < 2 && (
          <div className="mt-12">
            <button
              onClick={() => onComplete({ darkMode: false, musicEnabled: false })}
              className="text-sm opacity-50 hover:opacity-80 transition-opacity underline"
            >
              Skip onboarding
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;