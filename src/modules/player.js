import Gameboard from "./gameboard";

const Player = (gameboard = Gameboard(), name = "") => {
  const getGameboard = () => gameboard;
  const setGameboard = (board = Gameboard()) => (gameboard = board);

  const getRandomRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const placeRandomAttack = () => {
    let randomIndex = Math.floor(
      getRandomRange(0, gameboard.attackableCoords.length)
    );
    let randomCoord = gameboard.attackableCoords[randomIndex];

    const result = gameboard.recieveAttack(randomCoord);
    return {
      result,
      coord: randomCoord,
    };
  };

  const recieveAttack = (coord) => gameboard.recieveAttack(coord);

  return {
    name,
    getGameboard,
    setGameboard,
    placeRandomAttack,
    recieveAttack,
  };
};

export default Player;
