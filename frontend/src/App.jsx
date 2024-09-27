import SlideshowWithField from './components/slide';
import { useState, useEffect } from 'react';
import { fetchPlayers } from '@/services/api'; // Adjust the import path as necessary

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const result = await fetchPlayers();
        console.log('Fetched players:', result);
        setPlayers(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadPlayers();
  }, []);

  if (loading) return <div>Loading...</div>; // Show a loading message

  // For example, start with the first player
  const initialSL = players.length > 0 ? players[0].SL : null;

  return (
    <div>
      <SlideshowWithField 
        initialSL={initialSL} 
        totalPlayers={170}
      />
      {/* Add other components or routes as needed */}
    </div>
  );
}

export default App;
