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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="glass-effect p-8 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-10 bg-white/20 rounded"></div>
          <div className="h-10 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeam || !inputText || isNaN(parseInt(inputText)) || !player) {
      setMessage({type: 'error', text: 'Please select a team and enter a valid price'});
      return;
    }

    setIsSubmitting(true);
    try {
      await createTeamPlayer(selectedTeam.id, player.SL, parseInt(inputText));
      setMessage({type: 'success', text: 'Player assigned successfully!'});
      setInputText('');
      setSelectedTeam(null);
    } catch (error: any) {
      setMessage({type: 'error', text: error.message || 'Failed to assign player'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-effect p-8 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-2xl"></div>
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Assign Player</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Team Selection */}
        <div className="space-y-3">
          <label htmlFor="teamName" className="block text-lg font-semibold text-white">
            Select Team
          </label>
          <div className="relative">
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
              className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300"
              required
            >
              <option value="" className="text-gray-800">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id} className="text-gray-800">
                  {team.team_name} (Balance: ${team.balance})
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Price Input and Submit */}
        <div className="space-y-3">
          <label htmlFor="playerPrice" className="block text-lg font-semibold text-white">
            Bid Amount
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg">$</span>
              <input
                id="playerPrice"
                type="number"
                min="1"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter bid amount"
                className="w-full pl-8 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !selectedTeam || !inputText || player?.status}
              className="button-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            message.type === 'success' 
              ? 'bg-green-500/20 border-green-400/50 text-green-100' 
              : 'bg-red-500/20 border-red-400/50 text-red-100'
          }`}>
            <div className="flex items-center space-x-2">
              {message.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}
      </form>

      {/* Sold Overlay */}
      {player && player.status && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
          <div className="text-center">
            <div className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-2xl transform rotate-12 shadow-2xl mb-4">
              SOLD
            </div>
            <p className="text-white/80">This player has been assigned</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCardForm;