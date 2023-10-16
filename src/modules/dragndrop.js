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

  const reloadShipPlacementGrid = (player) => {
    const container = document.querySelector(".left-container");
    removeAllChildren(container);
    UI.generateGrid(player, true);
  };

  const onDrop = (event) => {
    event.preventDefault();

    const player = Game.getPlayer();

    //  determine if coords are inbounds
    // place ship on gameboard
    // reload ui

    const shipElement = document.getElementById(draggedShip);
    const ship = player.get("fleet")[shipElement.id];

    console.log(getDroppedCoords(event.target, ship));
  };

  const attachDragListeners = (elements) => {
    const ships = document.querySelectorAll(".place-ship");
    ships.forEach((ship) => ship.addEventListener("dragstart", onDragStart));

    const shipCells = document.querySelectorAll(".place-ship-cell");
    shipCells.forEach((cell) =>
      cell.addEventListener("mousedown", registerCellIndex),
    );

    const gridCell = document.querySelectorAll(".grid-cell");
    gridCell.forEach((cell) => {
      cell.addEventListener("drop", onDrop);
      cell.addEventListener("dragover", (event) => event.preventDefault());
    });
  };

  return {
    attachDragListeners,
  };
})();

export default DragNDrop;
