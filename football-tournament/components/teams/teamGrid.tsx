'use client';

import { useState, useEffect } from 'react';
import TeamCard from './teamCard';
import PlayerTable from './playerTable';
import { fetchTeams } from '@/lib/api';
import { Team } from '@/lib/database';

const TeamGrid = () => {
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      try {
        const result = await fetchTeams();
        setTeams(result);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleCardClick = (teamId: number) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">Team Management</h1>
        <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Teams Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 p-8">
        {teams.map((team, index) => (
          <div 
            key={team.id} 
            className="fade-in-up"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <TeamCard
              team={team}
              onClick={() => handleCardClick(team.id)}
              isExpanded={expandedTeam === team.id}
            />
          </div>
        ))}
      </div>

      {/* Expanded Team Overlay */}
      {expandedTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-20 transition-all duration-300">
          <div className="absolute inset-0" onClick={() => setExpandedTeam(null)}></div>
        </div>
      )}

      {/* Player Table */}
      {expandedTeam && (
        <PlayerTable id={expandedTeam} isExpanded={expandedTeam !== null} />
      )}
    </div>
  );
};

export default TeamGrid;