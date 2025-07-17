'use client';

import { useState, useEffect } from 'react';
import { fetchTeamPlayer } from '@/lib/api';
import { TeamPlayer } from '@/lib/database';

interface PlayerTableProps {
  id: number;
  isExpanded: boolean;
}

const PlayerTable = ({ id, isExpanded }: PlayerTableProps) => {
  const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      try {
        const result = await fetchTeamPlayer(id);
        setTeamPlayers(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [id]);

  if (loading) {
    return (
      <div className={`fixed top-8 p-6 w-[45vw] z-30 h-[85vh] glass-effect border border-white/20 rounded-2xl shadow-2xl transition-all duration-500 ${
        isExpanded ? 'right-8' : '-right-96'
      }`}>
        <div className="animate-pulse space-y-4 p-4">
          <div className="h-8 bg-white/20 rounded w-1/2"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-white/10 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const totalSpent = teamPlayers.reduce((sum, tp) => sum + tp.price, 0);

  return (
    <div
      className={`fixed top-8 p-6 w-[45vw] z-30 h-[85vh] glass-effect border border-white/20 rounded-2xl shadow-2xl transition-all duration-500 ${
        isExpanded ? 'right-8' : '-right-96'
      }`}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Team Players</h3>
        <div className="flex justify-center space-x-6 text-sm text-white/80">
          <span>Players: <span className="font-bold text-green-300">{teamPlayers.length}</span></span>
          <span>Total Spent: <span className="font-bold text-blue-300">${totalSpent}</span></span>
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden h-[calc(100%-120px)] rounded-xl border border-white/10">
        <div className="overflow-y-auto h-full custom-scrollbar">
          {teamPlayers.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/60">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-lg">No players assigned yet</p>
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-white">
              <thead className="sticky top-0 bg-white/10 backdrop-blur-sm border-b border-white/20">
                <tr>
                  <th className="py-4 px-4 font-semibold text-green-300">SL</th>
                  <th className="py-4 px-4 font-semibold text-green-300">Name</th>
                  <th className="py-4 px-4 font-semibold text-green-300">Department</th>
                  <th className="py-4 px-4 font-semibold text-green-300">Session</th>
                  <th className="py-4 px-4 font-semibold text-green-300">Position</th>
                  <th className="py-4 px-4 font-semibold text-green-300">Price</th>
                </tr>
              </thead>
              <tbody>
                {teamPlayers.map((teamPlayer, index) => (
                  <tr 
                    key={teamPlayer.player.SL} 
                    className={`border-b border-white/10 hover:bg-white/5 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white/5' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {teamPlayer.player.SL}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{teamPlayer.player.name}</div>
                    </td>
                    <td className="py-4 px-4 text-white/80">{teamPlayer.player.department}</td>
                    <td className="py-4 px-4 text-white/80">{teamPlayer.player.session}</td>
                    <td className="py-4 px-4">
                      <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {teamPlayer.player.playingPosition}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-green-300">${teamPlayer.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerTable;