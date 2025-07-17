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
 

  return (
    <div>
      
    </div>
  );
};

export default SearchModal;
