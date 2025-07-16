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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-8 p-6 w-screen h-screen">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onClick={() => handleCardClick(team.id)}
          isExpanded={expandedTeam === team.id}
        />
      ))}

      {expandedTeam && (
        <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen z-9"></div>
      )}
      {expandedTeam && (
        <PlayerTable id={expandedTeam} isExpanded={expandedTeam !== null} />
      )}
    </div>
  );
};

export default TeamGrid;