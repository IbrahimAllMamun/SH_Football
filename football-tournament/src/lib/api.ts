import { Player, Team, TeamPlayer } from './database';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:3000';

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/players`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const fetchPlayerBySL = async (sl: number): Promise<Player> => {
  const response = await fetch(`${API_BASE_URL}/api/players/${sl}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchRandomPlayer = async (): Promise<Player> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/players/random`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching random player:', error);
    throw error;
  }
};

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const fetchTeamPlayer = async (id: number): Promise<TeamPlayer[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/team-players/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching team players:', error);
    throw error;
  }
};

export const createTeamPlayer = async (team: number, player: number, price: number) => {
  const response = await fetch(`${API_BASE_URL}/api/team-players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ team, player, price }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create team player');
  }

  return response.json();
};