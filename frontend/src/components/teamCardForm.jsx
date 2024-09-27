import React, { useState } from 'react';

const TeamCardForm = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [inputText, setInputText] = useState('');

  const teamNames = [
    'Team A',
    'Team B',
    'Team C',
    'Team D',
    'Team E',
    'Team F',
    'Team G',
    'Team H',
    'Team I',
    'Team J',
    'Team K',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Team: ${selectedTeam}, Text: ${inputText}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg text-white bg-gray-600/30 font-fredoka backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        {/* Dropdown */}
        <div className="mb-4">
          <label className="block text-3xl font-medium mb-1">Select Team</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full p-2 text-black border rounded-md"
            required
          >
            <option value="">Select a team</option>
            {teamNames.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Text input and submit button side by side */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text"
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
    </div>
  );
};

export default TeamCardForm;
