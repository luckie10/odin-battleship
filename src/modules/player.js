const Player = (gameboard, name = "") => {
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
    gameboard,
    placeRandomAttack,
    recieveAttack,
  };
};

export default Player;
