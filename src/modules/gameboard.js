import Ship from "./ship";

const Gameboard = (size = [10, 10]) => {
  let activeShips = 0;
  const attackableCoords = [];

  const generateBoard = ([x, y]) => {
    const board = new Map();

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        board.set(`${i}${j}`, null);
        attackableCoords.push(`${i}${j}`);
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
    const coordIndex = attackableCoords.indexOf(coord);
    attackableCoords.splice(coordIndex, 1);

    const boardCell = board.get(coord);
    if (!boardCell) {
      board.set(coord, "miss");
      return "miss";
    }

    boardCell.hit();
    board.set(coord, "hit");
    if (boardCell.isSunk()) activeShips--;
    return "hit";
  };

  const hasActiveShips = () => activeShips > 0;

  return {
    attackableCoords,
    size,
    board,
    placeShip,
    clearBoard,
    recieveAttack,
    hasActiveShips,
  };
};

export default Gameboard;
