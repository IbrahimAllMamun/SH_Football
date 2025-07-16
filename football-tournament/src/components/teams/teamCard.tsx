'use client';

import { useState, useEffect } from 'react';
import { fetchTeamPlayer } from '@/lib/api';
import { Team, TeamPlayer } from '@/lib/database';
import ProgressBar from './progressBar';

interface TeamCardProps {
  team: Team;
  onClick: () => void;
  isExpanded: boolean;
}

const TeamCard = ({ team, onClick, isExpanded }: TeamCardProps) => {
  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      try {
        const result = await fetchTeamPlayer(team.id);
        setPlayers(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [team.id]);

  const total_player = 12;
  const max_player = 15;
  const player_number = players.length;

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`p-5 border rounded-xl shadow-md hover:scale-105 ${
        (player_number === max_player || team.balance < 20) ? 'bg-red-400' : 'bg-white'
      } cursor-pointer transform transition-transform duration-300 ease-in-out 
          ${isExpanded ? 'fixed top-10 left-10 w-[45vw] z-10 h-[90vh] scale-105' : 'w-full h-full scale-100'}`}
      onClick={onClick}
    >
      <div className={`h-auto w-full ${isExpanded ? 'my-[20vh]' : 'h-full'}`}>
        <div className={`flex flex-col justify-between ${isExpanded ? 'h-auto' : 'h-full'}`}>
          <div
            className={`flex items-center justify-center transition-all duration-300 ${
              isExpanded ? 'scale-110 flex-col' : ''
            }`}
          >
            <img
              src={`/logo/${team.team_name}.png`}
              alt={team.team_name}
              className="w-28 h-28 mb"
            />
            <div className={`font-bold mb-5 ${isExpanded ? 'text-center' : 'm-5'}`}>
              <h2 className="text-3xl font-bold mb-2">{team.team_name}</h2>
              <p className="text-2xl text-gray-600">Players: {player_number}</p>
              <p className="text-2xl text-gray-600">
                Next Bid Max: {
                  player_number < total_player
                    ? team.balance - (total_player - player_number - 1) * 20
                    : team.balance
                }
              </p>
            </div>
          </div>
          <div className={`${isExpanded ? 'mx-20 mt-10' : 'm-4'}`}>
            <ProgressBar progress={team.balance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;