export const nextPlayer = (currentSL: number, setSL: (sl: number) => void, totalPlayers: number) => {
  if (currentSL < totalPlayers) {
    setSL(currentSL + 1);
  } else {
    setSL(1); // Loop back to the first player
  }
};

export const prevPlayer = (currentSL: number, setSL: (sl: number) => void, totalPlayers: number) => {
  if (currentSL > 1) {
    setSL(currentSL - 1);
  } else {
    setSL(totalPlayers); // Loop back to the last player
  }
};