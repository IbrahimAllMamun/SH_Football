'use client';

import { useEffect, useRef, useState } from 'react';

interface RandomPlayerProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  playerSL: number;
}

const RandomPlayer = ({ isVisible, setIsVisible, playerSL }: RandomPlayerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayedSL, setDisplayedSL] = useState(playerSL);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsVisible]);

  // Auto-hide the card after 3 seconds when it becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  // Animation effect to display random numbers for 1.5 seconds before showing the actual playerSL
  useEffect(() => {
    if (isVisible) {
      let interval: NodeJS.Timeout;

      const animateSL = () => {
        interval = setInterval(() => {
          setDisplayedSL(Math.floor(Math.random() * 100) + 1);
        }, 80);

        setTimeout(() => {
          clearInterval(interval);
          setDisplayedSL(playerSL);
        }, 1500);
      };

      animateSL();
      return () => clearInterval(interval);
    }
  }, [isVisible, playerSL]);

  // ...rest of the code unchanged

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className={`transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-90'}`}
      >
        <div className="text-center">
          <div className="relative w-[400px] h-[400px]">  {/* Fixed size here */}
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
            
            {/* Main number display */}
            <div className="relative glass-effect border-4 border-white/30 rounded-3xl p-12 shadow-2xl flex items-center justify-center">
              <div className="text-[10rem] lg:text-[15rem] font-bold text-white drop-shadow-2xl font-kanit select-none">
                {displayedSL}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-white/80 text-xl font-medium">
            <p>Random Player Selected</p>
            <div className="flex justify-center space-x-2 mt-2 text-sm">
              <kbd className="px-2 py-1 bg-white/20 rounded">Ctrl</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded">Alt</kbd>
              <kbd className="px-2 py-1 bg-white/20 rounded">R</kbd>
              <span className="text-white/60">for new random</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPlayer;