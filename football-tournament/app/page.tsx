'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchPlayers, fetchRandomPlayer } from '@/lib/api';
import Slideshow from '@/components/slides/slideShow';
import { Player } from '@/lib/database';

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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && !event.altKey && event.code === 'Space') {
        event.preventDefault();
        setSearchVisible((prev) => {
          if (!prev) {
            setNavVisible(false);
            setRanVisible(false);
          }
          return !prev;
        });
      } else if (event.ctrlKey && event.altKey && event.code === 'Space') {
        event.preventDefault();
        setNavVisible((prev) => {
          if (!prev) {
            setSearchVisible(false);
            setRanVisible(false);
          }
          return !prev;
        });
      } else if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
        event.preventDefault();
        setRanVisible((prev) => {
          if (!prev) {
            setNavVisible(false);
            setSearchVisible(false);
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
  const [selectedSL, setSelectedSL] = useState<number>(initialSL);

  const handleSelectPlayer = (selectedPlayer: Player) => {
    setSelectedSL(selectedPlayer.SL);
    setPlayer(selectedPlayer);
    setSearchVisible(false);
  };

  if (loadingPlayers || (isRanVisible && loadingRandomPlayer)) {
    return (
      <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
        <div className="absolute top-10 left-10 z-50">Loading...</div>
      </div>
    );
  }

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
      <Slideshow initialSL={initialSL} totalPlayers={players.length} playerSL={selectedSL} />
    </div>
  );
}
