import SlideshowWithField from './components/slide';
import { useState, useEffect } from 'react';
import { fetchPlayers } from './services/api'; // Adjust the import path as necessary
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadPlayers(); // Call the async function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <SlideshowWithField players={players} />
    </>
  );
}

export default App;
