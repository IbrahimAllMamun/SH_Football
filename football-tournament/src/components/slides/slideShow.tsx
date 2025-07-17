'use client';

import { useState, useEffect, useRef } from 'react';
import TeamCardForm from './teamInfo';
import ACS from '@/components/acs/acs';
import { fetchPlayerBySL } from '@/lib/api';
import { nextPlayer, prevPlayer } from '@/utils/playerNavigation';
import { Player } from '@/lib/database';

interface SlideshowProps {
  initialSL: number;
  totalPlayers: number;
}

const Slideshow = ({ initialSL, totalPlayers }: SlideshowProps) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSL, setCurrentSL] = useState(initialSL);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to fetch player data by SL
  const getPlayerData = async (sl: number) => {
    setIsLoading(true);
    try {
      const result = await fetchPlayerBySL(sl);
      setPlayer(result);
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch player data whenever the SL changes
  useEffect(() => {
    getPlayerData(currentSL);
  }, [currentSL]);

  // Keypress handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if only Ctrl is pressed to toggle search modal
      if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault();
        setIsSearchVisible((prev) => !prev);
        setIsModalVisible((prev) => !prev);
        if (!isSearchVisible) {
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 50);
        }
      }
      // Handle Left arrow to go to the previous player
      else if (event.code === 'ArrowLeft') {
        event.preventDefault();
        prevPlayer(currentSL, setCurrentSL, totalPlayers);
      }
      // Handle Right arrow to go to the next player
      else if (event.code === 'ArrowRight') {
        event.preventDefault();
        nextPlayer(currentSL, setCurrentSL, totalPlayers);
      }
      // Handle Enter key to fetch player data
      else if (event.code === 'Enter') {
        event.preventDefault();
        const newSL = parseInt(inputValue, 10);
        if (!isNaN(newSL) && newSL > 0) {
          setCurrentSL(newSL);
          setInputValue('');
          setIsModalVisible(false);
          setIsSearchVisible(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue, isSearchVisible, currentSL, totalPlayers]);

  // Focus on the input field when the search bar appears
  useEffect(() => {
    if (isSearchVisible && isModalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible, isModalVisible]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newSL = parseInt(inputValue, 10);
    if (!isNaN(newSL) && newSL > 0) {
      setCurrentSL(newSL);
    }
    setInputValue('');
    setIsModalVisible(false);
    setTimeout(() => setIsSearchVisible(false), 300);
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading player...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <div className="w-full text-center font-bold text-white p-8 pb-4 relative z-10">
        <h1 className="text-5xl lg:text-6xl font-kanit gradient-text drop-shadow-2xl fade-in-up">
          Shahidullah Hall Football Fiesta 2024
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow items-center px-8 relative z-10">
        {/* Left Column - Player Info */}
        <div className="flex-none w-[35rem] flex items-center pl-12 slide-in-left">
          {player && (
            <div className="font-medium text-white space-y-6">
              <div className="relative">
                <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-2 border-white/30 text-4xl lg:text-5xl font-bold px-6 py-3 rounded-2xl shadow-2xl pulse-glow inline-block">
                  {player.playingPosition}
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight">
                  {player.name}
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-2xl lg:text-3xl font-medium text-green-100">
                      {player.department}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-2xl lg:text-3xl font-medium text-blue-100">
                      {player.session}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center Column - Player Image */}
        <div className="flex-[2] flex flex-col items-center justify-center px-8 fade-in-up">
          {player && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <img
                src={player.image}
                alt={player.name}
                className="relative w-80 h-80 lg:w-96 lg:h-96 border-8 border-white/30 object-cover rounded-full shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2"
              />
              
              {/* Player status overlay */}
              {player.status && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-xl transform rotate-12 shadow-2xl">
                    SOLD
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Team Form */}
        <div className="flex-none w-[35rem] flex items-center justify-center p-4 slide-in-right">
          <TeamCardForm player={player} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center w-full p-8 pt-4 relative z-10">
        {/* Player Number Badge */}
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-500 to-blue-600 border-4 border-white/30 rounded-full flex items-center justify-center shadow-2xl pulse-glow">
            {player && (
              <h1 className="text-white font-extrabold text-3xl lg:text-4xl">
                {player.SL}
              </h1>
            )}
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="hidden lg:flex items-center space-x-8 text-white/70 text-sm">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs">←</kbd>
            <span>Previous</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs">→</kbd>
            <span>Next</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl</kbd>
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Space</kbd>
            <span>Search</span>
          </div>
        </div>

        {/* Sponsor Section */}
        <div className="relative group">
          <img
            src="/sponsor.jpg"
            alt="sponsor"
            className="absolute w-16 h-16 lg:w-20 lg:h-20 -top-8 -right-8 z-40 border-4 border-white/30 rounded-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-110"
          />

          <div className="glass-effect text-white p-4 rounded-2xl shadow-2xl border border-white/20 card-hover">
            <ACS height={70} />
            <p className="font-medium text-xl mt-2">
              Md Nazmus Shakib
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Search Modal */}
      {isSearchVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50 
          transition-all duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className={`transform transition-all duration-300 ${isModalVisible ? 'scale-100' : 'scale-90'}`}>
            <form onSubmit={handleSubmit} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-75"></div>
              <input
                type="number"
                min="1"
                className="relative p-6 border-2 border-white/30 rounded-2xl text-black text-2xl w-[500px] h-20 bg-white/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-400/50 transition-all duration-300"
                placeholder="Enter player number..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
                disabled={!isModalVisible}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Enter</kbd>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow;