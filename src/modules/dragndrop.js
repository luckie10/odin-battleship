import { removeAllChildren } from "../util";
import Game from "./game";
import UI from "./ui";

const DragNDrop = (() => {
  let draggedShip;
  let draggedShipCellIndex;

  const onDragStart = (event) => (draggedShip = event.target.id);

  const registerCellIndex = (event) =>
    (draggedShipCellIndex = event.target.dataset.cellIndex);

  const getDroppedCoords = (target, ship) => {
    const coords = [];
    const [y, x] = target.dataset.coords.split("");

    for (let i = 0; i < ship.length; i++) {
      const coord = ship.get("vertical")
        ? `${Number(y) - draggedShipCellIndex + i}${x}`
        : `${y}${Number(x) - draggedShipCellIndex + i}`;
      coords.push(coord);
    }

    return coords;
  };

  const attachDropListeners = (elements) => {
    const gridCell = document.querySelectorAll(".grid-cell");
    gridCell.forEach((cell) => {
      cell.addEventListener("drop", onDrop);
      cell.addEventListener("dragover", (event) => event.preventDefault());
    });
  };

  const reloadShipPlacementGrid = (player) => {
    const container = document.querySelector(".left-container");
    removeAllChildren(container);

    const grid = UI.generateGrid(player, true);
    container.append(grid);
    attachDropListeners();
  };

  const onDrop = (event) => {
    event.preventDefault();

    const player = Game.getPlayer();

    const shipElement = document.getElementById(draggedShip);
    const ship = player.get("fleet")[shipElement.id];

    const coords = getDroppedCoords(event.target, ship);
    const gameboard = player.getGameboard();
    const result = gameboard.placeShip(coords, ship);

    if (result) {
      reloadShipPlacementGrid(player);
      shipElement.remove();
      if (gameboard.isFleetPlaced()) console.log("MOVE Along");
    }
  };

  const attachDragListeners = (elements) => {
    const ships = document.querySelectorAll(".place-ship");
    ships.forEach((ship) => ship.addEventListener("dragstart", onDragStart));

    const shipCells = document.querySelectorAll(".place-ship-cell");
    shipCells.forEach((cell) =>
      cell.addEventListener("mousedown", registerCellIndex),
    );

    attachDropListeners(elements);
  };

  return {
    attachDragListeners,
  };
})();

export default DragNDrop;
