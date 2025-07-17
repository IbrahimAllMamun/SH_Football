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

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (player: Player) => {
    onSelectPlayer(player);
    setIsVisible(false);
    setQuery('');
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
          placeholder="Search players..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <ul>
          {filteredPlayers.length === 0 && (
            <li className="text-gray-500 text-center">No players found.</li>
          )}
          {filteredPlayers.map((player) => (
            <li
              key={player.SL}
              className="p-2 cursor-pointer hover:bg-blue-100 rounded"
              onClick={() => handleSelect(player)}
            >
              {player.name} (SL: {player.SL})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
