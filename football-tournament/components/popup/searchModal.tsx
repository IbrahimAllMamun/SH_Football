'use client';

import { useState } from 'react';
import NavigationCard from '@/components/popup/navigationCard';
import SearchModal from '@/components/popup/searchModal';

export default function Home() {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Example search handler
  const handleSearch = (query: string) => {
    console.log('Search for:', query);
    // implement search logic here
  };

  return (
    <div>
      {/* Some page content */}
      
      <NavigationCard isVisible={isNavVisible} setIsVisible={setNavVisible} />
      <SearchModal isVisible={isSearchVisible} setIsVisible={setSearchVisible} onSearch={handleSearch} />

      {/* Add buttons or keyboard shortcuts to toggle these modals */}
    </div>
  );
}
