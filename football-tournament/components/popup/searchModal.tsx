'use client';

import { useState, useRef, useEffect } from 'react';
import { Player } from '@/lib/database';

interface SearchModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const SearchModal = ({ isVisible, setIsVisible, players, onSelectPlayer }: SearchModalProps) => {
  const [slQuery, setSlQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsVisible(false);
        setSlQuery('');
      }
    };
    if (isVisible) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isVisible, setIsVisible]);

  const handleSearch = () => {
    const match = players.find(p => p.SL.toString() === slQuery.trim());
    if (match) {
      onSelectPlayer(match);
      setIsVisible(false);
      setSlQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl p-6 w-96"
      >
        <input
          type="number"
          placeholder="Enter SL number"
          value={slQuery}
          onChange={(e) => setSlQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          autoFocus
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Search Player
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
