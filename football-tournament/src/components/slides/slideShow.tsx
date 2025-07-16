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
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to fetch player data by SL
  const getPlayerData = async (sl: number) => {
    try {
      const result = await fetchPlayerBySL(sl);
      setPlayer(result);
    } catch (error) {
      console.error('Error fetching player data:', error);
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

  return (
    <div className="flex flex-col h-full">
      {/* Player Number Display */}
      <div className="w-full text-center font-bold text-green-500 text-[4rem] p-5 pb-0">
        <h1 className="drop-shadow-[0_0px_10px_rgba(0,0,0,1)]">
          Shahidullah Hall Football Fiesta 2024
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        <div className="flex-none w-[35rem] flex items-center pl-20">
          {player && (
            <div className="font-medium text-white">
              <span className="bg-green-800 text-white border-2 text-5xl font-semibold me-2 px-4 py-1 rounded-full">
                {player.playingPosition}
              </span>
              <h2 className="text-5xl font-semibold mb-4 mt-3">{player.name}</h2>
              <p className="text-4xl font-medium my-4">{player.department}</p>
              <p className="text-4xl font-medium my-4">{player.session}</p>
            </div>
          )}
        </div>

        {/* Player Image */}
        <div className="flex-[2] flex flex-col items-center justify-center px-4">
          {player && (
            <img
              src={player.image}
              alt={player.name}
              className="w-[80%] border-8 border-white aspect-[4/4] drop-shadow-3xl object-cover rounded-[10000px] mb-4 transition-opacity duration-500 ease-in-out opacity-100"
            />
          )}
        </div>

        {/* Right Column */}
        <div className="flex-none w-[35rem] flex items-center justify-center p-4">
          <TeamCardForm player={player} />
        </div>
      </div>

      <div className="flex justify-between items-center w-full p-10 pt-0">
        <div className="border-[6px] w-20 h-20 py-4 border-white aspect-[4/4] rounded-[100px] justify-center bg-green-700">
          {player && (
            <h1 className="text-white font-extrabold text-center font-bold text-4xl">
              {player.SL}
            </h1>
          )}
        </div>

        <div className="relative">
          <img
            src="/sponsor.jpg"
            alt="sponsor"
            className="absolute w-16 -top-7 -right-7 z-40 border-4 border-white aspect-[4/4] drop-shadow-3xl object-cover rounded-[10000px] mb-4 transition-opacity duration-500 ease-in-out opacity-100"
          />

          <div className="flex flex-col shadow-lg rounded-lg text-white p-3 bg-green-600/80 font-medium backdrop-blur-sm border-4 border-white">
            <ACS height={70} />
            <p className="font-medium text-white font-medium text-2xl">
              Md Nazmus Shakib
            </p>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
          transition-all duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded shadow-lg transform transition-all duration-300 
            ${isModalVisible ? 'scale-100' : 'scale-90'}`}
          >
            <input
              type="number"
              min="1"
              className="p-2 border border-gray-400 rounded text-black w-[500px] h-14"
              placeholder="Enter player number..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
              disabled={!isModalVisible}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Slideshow;