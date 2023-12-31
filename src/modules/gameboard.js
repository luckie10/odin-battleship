import { shipTypes } from "./ship";
import { stateAccess } from "../util";

const Gameboard = (size = [10, 10]) => {
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

  const state = {
    activeShips: 0,
    board: generateBoard(size),
    placedShips: new Set(),
  };

  const placeShip = (targetCoord, ship, shipCellIndex = 0) => {
    const coords = [];
    const [y, x] = Array.from(targetCoord);

    for (let i = 0; i < ship.length; i++) {
      const coord = ship.get("vertical")
        ? `${Number(y) - shipCellIndex + i}${x}`
        : `${y}${Number(x) - shipCellIndex + i}`;
      coords.push(coord);
    }

    const isValid = coords.every(
      (coord) => state.board.has(coord) && !state.board.get(coord),
    );
    if (!isValid) return false;

    coords.forEach((coord) => {
      state.board.set(coord, ship);
    });
    state.activeShips++;
    state.placedShips.add(ship);

    return true;
  };

  const isFleetPlaced = () => state.placedShips.size === shipTypes.length;

  const clearBoard = () => {
    state.activeShips = 0;
    state.board.clear();
    state.board = generateBoard(size);
    state.placedShips = [];
  };

  const recieveAttack = (coord) => {
    const coordIndex = attackableCoords.indexOf(coord);
    attackableCoords.splice(coordIndex, 1);

    const boardCell = state.board.get(coord);
    if (!boardCell) {
      state.board.set(coord, "miss");
      return "miss";
    }

    boardCell.hit();
    state.board.set(coord, "hit");
    if (boardCell.isSunk()) {
      state.activeShips--;
    }
    return "hit";
  };

  const hasActiveShips = () => state.activeShips > 0;

  return {
    ...stateAccess(state),
    attackableCoords,
    size,
    placeShip,
    clearBoard,
    recieveAttack,
    hasActiveShips,
    isFleetPlaced,
  };
};

export default Gameboard;
