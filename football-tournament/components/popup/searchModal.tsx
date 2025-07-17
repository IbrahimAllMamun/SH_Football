'use client';

import { useEffect, useRef, useState } from 'react';
import { Player } from '@/lib/database';

interface SearchModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const SearchModal = ({ isVisible, setIsVisible, players, onSelectPlayer }: SearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setQuery('');
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits
    if (/^\d*$/.test(value)) {
      setQuery(value);
    }
  };

  const matchedPlayer = players.find((player) => player.SL === Number(query));

  const handleSelect = () => {
    if (matchedPlayer) {
      onSelectPlayer(matchedPlayer);
      setIsVisible(false);
      setQuery('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 w-[400px] max-h-[80vh] overflow-y-auto shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter player SL (number)..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={query}
          onChange={handleChange}
          autoFocus
        />

        {query !== '' && (
          <>
            {matchedPlayer ? (
              <div
                className="p-2 cursor-pointer hover:bg-blue-100 rounded text-center"
                onClick={handleSelect}
              >
                {matchedPlayer.name} (SL: {matchedPlayer.SL})
              </div>
            ) : (
              <div className="text-gray-500 text-center">No player found with SL {query}.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
