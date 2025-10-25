  import React, { useState, useEffect } from 'react';
import { LogoIcon, SyringeIcon } from './icons';

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 1));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full bg-cyan-50 text-center p-8">
      <style>{`
        @keyframes scale-in-content {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in-content {
          animation: scale-in-content 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
      <div className="w-full"></div> {/* Spacer for top */}
      
      <div className="flex flex-col items-center justify-center animate-scale-in-content">
        <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white rounded-full mb-6 shadow-lg">
            <LogoIcon className="w-24 h-24 md:w-32 md:h-32" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-700 font-cairo">نبض جوار</h1>
        <p className="text-lg md:text-xl text-cyan-600 mt-2">رعايتكم في راحة منزلكم</p>
      </div>
      
      <div className="w-full max-w-xs flex flex-col items-center">
        <SyringeIcon progress={progress} />
        <p className="text-cyan-700 font-bold text-lg mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default SplashScreen;