const Player = (gameboard, name = "") => {
  const getRandomRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const getRandomCoord = () => {
    const x = getRandomRange(0, 9);
    const y = getRandomRange(0, 9);

    return `${y}${x}`;
  };

  const placeRandomAttack = (gameboard) => {
    let randomCoord;
    do randomCoord = getRandomCoord();
    while (gameboard.board.has(randomCoord));

    return gameboard.recieveAttack(randomCoord);
  };

  const placeAttack = (gameboard, coord) => gameboard.recieveAttack(coord);

  return {
    name,
    gameboard,
    placeRandomAttack,
    placeAttack,
  };
};

export default Player;
