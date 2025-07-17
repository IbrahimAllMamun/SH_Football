'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUsers } from '@fortawesome/free-solid-svg-icons';

interface NavigationCardProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const NavigationCard = ({ isVisible, setIsVisible }: NavigationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

  // Function to handle link click
  const handleLinkClick = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className={`transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-90'}`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Navigation</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="/" onClick={handleLinkClick}>
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative glass-effect hover:bg-white/20 w-64 h-20 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 text-white font-bold text-xl border border-white/20">
                <FontAwesomeIcon icon={faImage} className="text-2xl" />
                <span>Slideshow</span>
              </div>
            </div>
          </Link>

          <Link href="/teams" onClick={handleLinkClick}>
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative glass-effect hover:bg-white/20 w-64 h-20 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 text-white font-bold text-xl border border-white/20">
                <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                <span>Teams</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="text-center mt-6 text-white/60 text-sm">
          <p>
            Press <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl</kbd> + 
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Alt</kbd> + 
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Space</kbd> to toggle
          </p>

        </div>
      </div>
    </div>
  );
};

export default NavigationCard;