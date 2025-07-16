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
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className="flex font-bold text-2xl text-white flex-col items-center"
      >
        <div className="flex items-center">
          <Link href="/" onClick={handleLinkClick}>
            <div className={`flex justify-center items-center hover:bg-orange-700 hover:scale-110 w-64 h-20 m-5 p-4 bg-green-700 rounded-3xl shadow-lg transform transition-all duration-300 
              ${isVisible ? 'scale-100' : 'scale-90'}`}>
              <FontAwesomeIcon icon={faImage} className="mr-2" />
              Slideshow
            </div>
          </Link>

          <Link href="/teams" onClick={handleLinkClick}>
            <div className={`flex justify-center hover:bg-orange-700 hover:scale-110 items-center w-64 h-20 m-5 p-4 bg-green-700 rounded-3xl shadow-lg transform transition-all duration-300 
              ${isVisible ? 'scale-100' : 'scale-90'}`}>
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Teams
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationCard;