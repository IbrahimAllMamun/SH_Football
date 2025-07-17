'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchPlayers, fetchRandomPlayer } from '@/lib/api';
import Slideshow from '@/components/slides/slideShow';
import { Player } from '@/lib/database';

// Dynamically import client-only components to prevent hydration mismatch
const NavigationCard = dynamic(() => import('@/components/popup/navigationCard'), {
  ssr: false
});

const RandomPlayer = dynamic(() => import('@/components/popup/random'), {
  ssr: false
});

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingRandomPlayer, setLoadingRandomPlayer] = useState(false);
  const [isNavVisible, setNavVisible] = useState(false);
  const [isRanVisible, setRanVisible] = useState(false);

  // Fetch all players when the component mounts
  useEffect(() => {
    const loadPlayers = async () => {
      setLoadingPlayers(true);
      try {
        const result = await fetchPlayers();
        setPlayers(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoadingPlayers(false);
      }
    };

    loadPlayers();
  }, []);

  // Handle key press events for toggling navigation cards and fetching random players
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.code === 'Space') {
        event.preventDefault();
        setNavVisible((prev) => !prev);
      } else if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
        event.preventDefault();
        setRanVisible((prev) => !prev);

        const loadRandomPlayer = async () => {
          setLoadingRandomPlayer(true);
          try {
            const result = await fetchRandomPlayer();
            setPlayer(result);
          } catch (error) {
            console.error('Error fetching random player:', error);
          } finally {
            setLoadingRandomPlayer(false);
          }
        };

        loadRandomPlayer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Show loading indicator when fetching players or random player
  if (loadingPlayers || (isRanVisible && loadingRandomPlayer)) {
    return (
      <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
        <div className="absolute top-10 left-10 z-50">Loading...</div>
      </div>
    );
  }

  // Set the initialSL based on the random player or the first player from the list
  const initialSL = player?.SL || (players.length > 0 ? players[0].SL : 1);

  return (
    <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
      {/* Render navigation and random player cards */}
      <NavigationCard isVisible={isNavVisible} setIsVisible={setNavVisible} />
      <RandomPlayer isVisible={isRanVisible} setIsVisible={setRanVisible} playerSL={player?.SL || 0} />

      <Slideshow initialSL={initialSL} totalPlayers={players.length} />
    </div>
  );
}