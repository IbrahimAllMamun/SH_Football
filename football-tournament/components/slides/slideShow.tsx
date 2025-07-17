'use client';

import { Player } from '@/lib/database';
import { useEffect, useState } from 'react';

interface SlideShowProps {
  players: Player[];
  currentPlayer: Player | null;
}

const SlideShow = ({ players, currentPlayer }: SlideShowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (currentPlayer) {
      const index = players.findIndex(p => p.SL === currentPlayer.SL);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [currentPlayer, players]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1 < players.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [players.length]);

  if (players.length === 0) return <div className="text-center">No players found</div>;

  const player = players[activeIndex];

  return (
    <div className="max-w-xl mx-auto mt-10 px-6">
      <div className="rounded-xl bg-white shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Player SL: {player.SL}</h2>
        <p className="text-lg font-medium">Name: {player.name}</p>
        {/* Add more fields here as needed */}
        <div className="mt-4 text-sm text-gray-500">
          Slide {activeIndex + 1} of {players.length}
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
