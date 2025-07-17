'use client';

import { useEffect, useState } from 'react';

interface SlideshowProps {
  initialSL: number;
  totalPlayers: number;
  playerSL: number;
}

export default function Slideshow({ initialSL, totalPlayers, playerSL }: SlideshowProps) {
  const [currentSL, setCurrentSL] = useState(initialSL);

  useEffect(() => {
    setCurrentSL(playerSL);
  }, [playerSL]);

  const goNext = () => {
    setCurrentSL((prev) => (prev < totalPlayers ? prev + 1 : prev));
  };

  const goPrev = () => {
    setCurrentSL((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center text-white text-5xl">
      <div className="absolute top-4 right-4 text-sm">SL: {currentSL}</div>
      <button onClick={goPrev} className="absolute left-10 text-3xl p-2 bg-black/30 rounded-full">
        ◀
      </button>
      <div>Slide for Player #{currentSL}</div>
      <button onClick={goNext} className="absolute right-10 text-3xl p-2 bg-black/30 rounded-full">
        ▶
      </button>
    </div>
  );
}
