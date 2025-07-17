'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchPlayers, fetchRandomPlayer } from '@/lib/api';
import Slideshow from '@/components/slides/slideShow';
import { Player } from '@/lib/database';

// Dynamically import popup components (client-only)
const NavigationCard = dynamic(() => import('@/components/popup/navigationCard'), { ssr: false });
const SearchModal = dynamic(() => import('@/components/popup/searchModal'), { ssr: false });
const RandomPlayer = dynamic(() => import('@/components/popup/random'), { ssr: false });

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingRandomPlayer, setLoadingRandomPlayer] = useState(false);

  const [isNavVisible, setNavVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isRanVisible, setRanVisible] = useState(false);

  // Load players once on mount
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && !event.altKey && event.code === 'Space') {
        // Ctrl + Space (Search modal)
        event.preventDefault();
        setSearchVisible((prev) => {
          if (!prev) {
            setNavVisible(false);
            setRanVisible(false);
          }
          return !prev;
        });
      } else if (event.ctrlKey && event.altKey && event.code === 'Space') {
        // Ctrl + Alt + Space (Navigation modal)
        event.preventDefault();
        setNavVisible((prev) => {
          if (!prev) {
            setSearchVisible(false);
            setRanVisible(false);
          }
          return !prev;
        });
      } else if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
        // Ctrl + Alt + R (Random player modal)
        event.preventDefault();
        setRanVisible((prev) => {
          if (!prev) {
            setNavVisible(false);
            setSearchVisible(false);
            // Load random player
            (async () => {
              setLoadingRandomPlayer(true);
              try {
                const result = await fetchRandomPlayer();
                setPlayer(result);
              } catch (error) {
                console.error('Error fetching random player:', error);
              } finally {
                setLoadingRandomPlayer(false);
              }
            })();
          }
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const initialSL = player?.SL || (players.length > 0 ? players[0].SL : 1);

  // Handle loading UI
  if (loadingPlayers || (isRanVisible && loadingRandomPlayer)) {
    return (
      <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
        <div className="absolute top-10 left-10 z-50 text-white font-semibold">Loading...</div>
      </div>
    );
  }

  const handleSelectPlayer = (selectedPlayer: Player) => {
    setPlayer(selectedPlayer);
    setSearchVisible(false);
  };

  return (
    <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
      <NavigationCard isVisible={isNavVisible} setIsVisible={setNavVisible} />
      <SearchModal
        isVisible={isSearchVisible}
        setIsVisible={setSearchVisible}
        players={players}
        onSelectPlayer={handleSelectPlayer}
      />
      <RandomPlayer isVisible={isRanVisible} setIsVisible={setRanVisible} playerSL={player?.SL || 0} />
      <Slideshow initialSL={initialSL} totalPlayers={players.length} />
    </div>
  );
}
