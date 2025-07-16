'use client';

import { useState, useEffect } from 'react';
import { fetchTeams, createTeamPlayer } from '@/lib/api';
import { Team, Player } from '@/lib/database';

interface TeamCardFormProps {
  player: Player | null;
}

const TeamCardForm = ({ player }: TeamCardFormProps) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [inputText, setInputText] = useState('');
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

  if (loading) return <div>Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeam || !inputText || isNaN(parseInt(inputText)) || !player) {
      console.error('Invalid team or price input');
      return;
    }

    try {
      const result = await createTeamPlayer(selectedTeam.id, player.SL, parseInt(inputText));
      console.log('Success:', result);
      setInputText('');
      setSelectedTeam(null);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg text-white bg-gray-600/30 font-medium backdrop-blur-sm">
      <form id="playerForm" onSubmit={handleSubmit}>
        {/* Dropdown */}
        <div className="mb-4">
          <label htmlFor="teamName" className="block text-3xl font-medium mb-1">
            Select Team
          </label>
          <select
            id="teamName"
            value={selectedTeam ? selectedTeam.id : ''}
            onChange={(e) => {
              const selectedTeamId = e.target.value;
              const selectedTeamObj = teams.find(
                (team) => team.id === parseInt(selectedTeamId)
              );
              setSelectedTeam(selectedTeamObj || null);
            }}
            className="w-full p-2 text-black border rounded-md"
            required
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        {/* Text input and submit button side by side */}
        <div className="flex items-center gap-2">
          <input
            id="playerPrice"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter price"
            className="flex-1 p-2 text-black border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-green-500 py-2 px-4 rounded text-white hover:bg-green-700 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>

      {player && player.status ? (
        <div className="relative m-0 p-0">
          <img
            src="/images/sold.svg"
            alt="sold"
            className="absolute w-96 z-50 -left-[25rem] -top-80"
          />
        </div>
      ) : null}
    </div>
  );
};

export default TeamCardForm;