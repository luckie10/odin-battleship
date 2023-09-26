import Ship from "./ship";

const Gameboard = (size = [10, 10]) => {
  let activeShips = 0;

  const generateBoard = ([x, y]) => {
    const board = new Map();

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        board.set(`${i}${j}`, null);
      }
    }
    return board;
  };

  const board = generateBoard(size);

  const placeShip = (coords) => {
    const ship = Ship(coords.length);

    coords.map((coord) => {
      if (board.get(coord))
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
    if (!board.get(coord)) {
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
    size,
    board,
    placeShip,
    clearBoard,
    recieveAttack,
    hasActiveShips,
  };
};

export default Gameboard;
