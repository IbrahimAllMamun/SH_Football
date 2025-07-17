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

  // Close modal on outside click
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

  // Only filter by exact SL match (converted to number)
  const filteredPlayers = players.filter((player) =>
    query === '' ? false : player.SL === Number(query)
  );

  const handleSelect = (player: Player) => {
    onSelectPlayer(player);
    setIsVisible(false);
    setQuery('');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      
    </div>
  );
};

export default SearchModal;
