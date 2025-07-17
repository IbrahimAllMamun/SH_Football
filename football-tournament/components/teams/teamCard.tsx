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
  const isTeamFull = player_number === max_player || team.balance < 20;

  if (loading) {
    return (
      <div className="glass-effect p-6 rounded-2xl shadow-2xl border border-white/20 h-80 animate-pulse">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto"></div>
          <div className="h-6 bg-white/20 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden cursor-pointer transform transition-all duration-500 ease-in-out
        ${isExpanded 
          ? 'fixed top-8 left-8 w-[45vw] h-[85vh] z-30 scale-105' 
          : 'w-full h-80 hover:scale-105'
        }
        ${isTeamFull 
          ? 'glass-effect border-red-400/50 bg-red-500/10' 
          : 'glass-effect border-white/20 hover:border-green-400/50'
        }
        rounded-2xl shadow-2xl card-hover`}
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className={`relative z-10 p-6 h-full flex flex-col ${isExpanded ? 'justify-center' : 'justify-between'}`}>
        {/* Team Info */}
        <div className={`text-center transition-all duration-300 ${isExpanded ? 'scale-110 mb-8' : ''}`}>
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-50"></div>
            <img
              src={`/logo/${team.team_name}.png`}
              alt={team.team_name}
              className="relative w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full border-4 border-white/30 shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/logo/default.png';
              }}
            />
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            {team.team_name}
          </h2>
          
          <div className="space-y-3 text-white/90">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-lg lg:text-xl font-medium">
                Players: <span className="font-bold text-green-300">{player_number}</span>
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-lg lg:text-xl font-medium">
                Next Bid Max: <span className="font-bold text-blue-300">
                  ${player_number < total_player
                    ? team.balance - (total_player - player_number - 1) * 20
                    : team.balance}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`${isExpanded ? 'mx-8' : 'mx-2'} transition-all duration-300`}>
          <ProgressBar progress={team.balance} />
        </div>

        {/* Status Indicator */}
        {isTeamFull && (
          <div className="absolute top-4 right-4">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              FULL
            </div>
          </div>
        )}

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-blue-500/0 to-purple-600/0 hover:from-green-400/5 hover:via-blue-500/5 hover:to-purple-600/5 transition-all duration-300 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default TeamCard;