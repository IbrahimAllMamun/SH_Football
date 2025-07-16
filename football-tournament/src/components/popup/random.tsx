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

  // Auto-hide the card after 2 seconds when it becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  // Animation effect to display random numbers for 1 second before showing the actual playerSL
  useEffect(() => {
    if (isVisible) {
      let interval: NodeJS.Timeout;

      const animateSL = () => {
        interval = setInterval(() => {
          setDisplayedSL(Math.floor(Math.random() * 100) + 1);
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          setDisplayedSL(playerSL);
        }, 1000);
      };

      animateSL();
      return () => clearInterval(interval);
    }
  }, [isVisible, playerSL]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className="flex font-bold text-[20rem] text-white flex-col items-center"
      >
        <div className="flex items-center">
          <span>{displayedSL}</span>
        </div>
      </div>
    </div>
  );
};

export default RandomPlayer;