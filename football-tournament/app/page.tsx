'use client';

import { useState } from 'react';
import SlideShow from '@/components/slides/slideShow';
import SearchModal from '@/components/popup/searchModal';
import { Player } from '@/lib/database';
import players from '@/lib/players.json'; // or fetch from DB

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <button
        onClick={() => setShowSearch(true)}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
      >
        Search (Ctrl+Space)
      </button>

      <SlideShow players={players} currentPlayer={selectedPlayer} />

      <SearchModal
        isVisible={showSearch}
        setIsVisible={setShowSearch}
        players={players}
        onSelectPlayer={(player) => setSelectedPlayer(player)}
      />
    </main>
  );
}
