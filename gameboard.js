import Ship from "./ship";

const Gameboard = () => {
  const board = new Map();
  let activeShips = 0;

  const placeShip = (coords) => {
    const ship = Ship(coords.length);

    coords.map((coord) => {
      if (board.has(coord))
        throw new Error(`A ship already exists at the ${coord} location`);

      board.set(coord, ship);
    });
    activeShips++;

    return ship;
  };

  const clearBoard = () => {
    activeShips = 0;
    board.clear();
  };

  const recieveAttack = (coord) => {
    if (!board.has(coord)) {
      board.set(coord, "miss");
      return "miss";
    }

    const ship = board.get(coord);
    ship.hit();
    board.set(coord, "hit");
    if (ship.isSunk()) activeShips--;
    return "hit";
  };

  const hasActiveShips = () => activeShips > 0;

  return {
    board,
    placeShip,
    clearBoard,
    recieveAttack,
    hasActiveShips,
  };
};

export default Gameboard;
