const PLAYER_URL = 'http://127.0.0.1:8000/api/players/';

export const fetchPlayers = async () => {
  try {
    const response = await fetch(PLAYER_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result; // Return the fetched players
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
const TEAM_URL = 'http://127.0.0.1:8000/api/teams/';

export const fetchTeam = async () => {
  try {
    const response = await fetch(TEAM_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result; // Return the fetched players
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};