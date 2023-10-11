import { createElement, removeAllChildren } from "../util";
import Game from "./game";

import "../style.scss";

const UI = (() => {
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");
  const gameoverContainer = document.querySelector(".game-over-container");
  const message = gameoverContainer.querySelector(".message");
  const againButton = gameoverContainer.querySelector(".again");

  const resetGame = () => {
    const player = Game.getPlayer();
    const opp = Game.getOpponent();

    player.resetGameboard();
    opp.resetGameboard();

    clearGridContainers();
    renderPlayerGrids(player, opp);
    toggleGameover();
  };

  againButton.addEventListener("click", resetGame);

  const toggleGameover = (msg) => {
    message.textContent = msg;
    gameoverContainer.classList.toggle("invisible");
  };

  const updatePlayerGrid = (result, coord) => {
    const cell = leftContainer.querySelector(`.grid .cell-${coord}`);
    cell.classList.add(result);
  };

  const sendAttack = (event) => {
    const opponent = Game.getOpponent();
    const target = event.target;
    const coords = target.dataset.coords;
    const result = opponent.recieveAttack(coords);

    if (result) target.classList.add(result);
    Game.checkState();
  };

  const attachAttackListeners = (parent) => {
    const cells = parent.querySelectorAll(".grid-cell");
    cells.forEach((cell) =>
      cell.addEventListener("click", sendAttack, { once: true })
    );
  };

  const generateCell = (value, key, isPlayer) => {
    const cell = createElement("div", {
      class: `grid-cell`,
      "data-coords": key,
    });

    if (value === "hit" || value === "miss") cell.classList.add(value);
    else if (value) {
      if (isPlayer) cell.classList.add("ship");
    }

    return cell;
  };

  const generateGrid = (player, isPlayer) => {
    const { board, size } = player.getGameboard();
    const [x, y] = size;
    const grid = createElement("div", { class: "grid" });
    grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${y}, 1fr)`;

    board.forEach((value, key) =>
      grid.append(generateCell(value, key, isPlayer))
    );

    return grid;
  };

  const rotateShip = (event) => {
    let target = event.target;
    if (target.classList.contains("place-ship-cell"))
      target = target.parentNode;

    const parent = target.parentNode;
    const previousSibling = target.previousSibling;

    if (parent) {
      const { length, vertical } = target.dataset;
      parent.removeChild(target);
      if (previousSibling)
        previousSibling.after(
          renderShip(length, vertical === "true" ? false : true)
        );
      else
        parent.firstChild.before(
          renderShip(length, vertical === "true" ? false : true)
        );
    }
  };

  const renderShip = (length, verticalOriention = true) => {
    const ship = createElement("div", {
      class: "place-ship",
      draggable: true,
      "data-length": length,
      "data-vertical": verticalOriention,
    });
    ship.style["flex-direction"] = verticalOriention ? "column" : "row";
    ship.addEventListener("dblclick", rotateShip);

    for (let i = 0; i < length; i++) {
      const cell = createElement("div", {
        class: "place-ship-cell",
        "data-cell": i,
      });

      ship.append(cell);
    }

    return ship;
  };

  const renderShips = () => {
    const shipsContainer = createElement("div", {
      class: "place-ships-container",
    });

    shipsContainer.append(renderShip(5));
    shipsContainer.append(renderShip(4));
    shipsContainer.append(renderShip(3));
    shipsContainer.append(renderShip(3));
    shipsContainer.append(renderShip(2));
    rightContainer.append(shipsContainer);
  };

  const clearGridContainers = () => {
    removeAllChildren(leftContainer);
    removeAllChildren(rightContainer);
  };

  const renderPlayerGrids = (player, opponent) => {
    leftContainer.append(generateGrid(player, true));
    rightContainer.append(generateGrid(opponent, false));

    attachAttackListeners(rightContainer);
  };

  const renderShipPlacement = (player) => {
    leftContainer.append(generateGrid(player));
    renderShips();
  };

  return {
    updatePlayerGrid,
    renderPlayerGrids,
    toggleGameover,
    renderShipPlacement,
  };
})();

export default UI;
