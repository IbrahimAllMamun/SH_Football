export interface Player {
  SL: number;
  name: string;
  department: string;
  session: string;
  playingPosition: string;
  image: string;
  status: boolean;
  randomized: boolean;
}

export interface Team {
  id: number;
  owner: string;
  team_name: string;
  balance: number;
}

export interface TeamPlayer {
  team: Team;
  player: Player;
  price: number;
}

// In-memory database simulation
let players: Player[] = [
  {
    SL: 1,
    name: "Md Shahariar Hossain Shakib",
    department: "Zoology",
    session: "2021-22",
    playingPosition: "CM",
    image: "/images/image_1.jpg",
    status: false,
    randomized: false
  },
  {
    SL: 2,
    name: "A K M Sumon",
    department: "Chemistry",
    session: "2022-23",
    playingPosition: "LW",
    image: "/images/image_2.jpg",
    status: false,
    randomized: false
  },
  {
    SL: 3,
    name: "Srabon Islam Shovo",
    department: "Pharmacy",
    session: "2022-23",
    playingPosition: "GK",
    image: "/images/image_3.jpg",
    status: false,
    randomized: false
  },
  {
    SL: 4,
    name: "Tauhidull Islam",
    department: "Pharmacy",
    session: "2022-23",
    playingPosition: "CM",
    image: "/images/image_4.jpg",
    status: false,
    randomized: false
  },
  {
    SL: 5,
    name: "Hasibul Hasan Shanto",
    department: "Physics",
    session: "2020-21",
    playingPosition: "RB",
    image: "/images/image_5.jpg",
    status: false,
    randomized: false
  }
  // Add more players as needed...
];

let teams: Team[] = [
  {
    id: 1,
    owner: "Owner 1",
    team_name: "Team Alpha",
    balance: 1000
  },
  {
    id: 2,
    owner: "Owner 2",
    team_name: "Team Beta",
    balance: 1000
  },
  {
    id: 3,
    owner: "Owner 3",
    team_name: "Team Gamma",
    balance: 1000
  },
  {
    id: 4,
    owner: "Owner 4",
    team_name: "Team Delta",
    balance: 1000
  }
];

let teamPlayers: TeamPlayer[] = [];

// Database operations
export const db = {
  players: {
    getAll: () => players,
    getById: (sl: number) => players.find(p => p.SL === sl),
    update: (sl: number, updates: Partial<Player>) => {
      const index = players.findIndex(p => p.SL === sl);
      if (index !== -1) {
        players[index] = { ...players[index], ...updates };
        return players[index];
      }
      return null;
    },
    getRandom: () => {
      const availablePlayers = players.filter(p => !p.status && !p.randomized);
      
      if (availablePlayers.length === 0) {
        // Reset randomized field for all players
        players.forEach(p => p.randomized = false);
        return db.players.getRandom();
      }
      
      const randomIndex = Math.floor(Math.random() * availablePlayers.length);
      const selectedPlayer = availablePlayers[randomIndex];
      selectedPlayer.randomized = true;
      
      return selectedPlayer;
    }
  },
  
  teams: {
    getAll: () => teams,
    getById: (id: number) => teams.find(t => t.id === id),
    update: (id: number, updates: Partial<Team>) => {
      const index = teams.findIndex(t => t.id === id);
      if (index !== -1) {
        teams[index] = { ...teams[index], ...updates };
        return teams[index];
      }
      return null;
    }
  },
  
  teamPlayers: {
    getAll: () => teamPlayers,
    getByTeamId: (teamId: number) => teamPlayers.filter(tp => tp.team.id === teamId),
    create: (teamId: number, playerSL: number, price: number) => {
      const team = db.teams.getById(teamId);
      const player = db.players.getById(playerSL);
      
      if (!team || !player) {
        throw new Error('Team or player not found');
      }
      
      if (player.status) {
        throw new Error('Player is already sold');
      }
      
      if (team.balance < price) {
        throw new Error('Insufficient balance');
      }
      
      // Update player status
      db.players.update(playerSL, { status: true });
      
      // Update team balance
      db.teams.update(teamId, { balance: team.balance - price });
      
      // Create team player relationship
      const teamPlayer: TeamPlayer = {
        team,
        player,
        price
      };
      
      teamPlayers.push(teamPlayer);
      return teamPlayer;
    }
  }
};