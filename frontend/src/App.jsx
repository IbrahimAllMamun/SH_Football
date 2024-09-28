import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPlayers } from '@/services/api';
import TeamGrid from './components/teams/teamGrid';
import Slideshow from './components/slides/slideShow';
import NavigationCard from '@/components/NavigationCard'; // Adjust the import path accordingly

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [isNavVisible, setNavVisible] = useState(false); // Add loading state

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const result = await fetchPlayers();
        setPlayers(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadPlayers();
  }, []);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.altKey && event.code === 'Space') {
        event.preventDefault();
        setNavVisible(prev => !prev); // Toggle navigation card visibility
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  if (loading) return <div>Loading...</div>; // Show a loading message

  // For example, start with the first player
  const initialSL = players.length > 0 ? players[0].SL : null;

  return (
    <Router>
    <div className="fixed top-0 left-0 bg-[url('/public/bg.jpg')] bg-cover bg-bottom w-screen h-screen ">
{/* Button to toggle the navigation card */}
        
        <NavigationCard isVisible={isNavVisible} setIsVisible={setNavVisible} />
        
        <Routes>
          <Route path="/" element={<Slideshow initialSL={initialSL} totalPlayers={players.length} />} />
          <Route path="/teams" element={<TeamGrid />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
