export const nextPlayer = (index, setIndex, playersLength) => {
    setIndex((prevIndex) => (prevIndex + 1) % playersLength);
  };
  
  export const prevPlayer = (index, setIndex, playersLength) => {
    setIndex((prevIndex) => (prevIndex - 1 + playersLength) % playersLength);
  };
  