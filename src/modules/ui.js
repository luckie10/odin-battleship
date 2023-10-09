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

    player.setGameboard();
    opp.setGameboard();

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

  const clearGridContainers = () => {
    removeAllChildren(leftContainer);
    removeAllChildren(rightContainer);
  };

  const renderPlayerGrids = (player, opponent) => {
    leftContainer.append(generateGrid(player, true));
    rightContainer.append(generateGrid(opponent, false));

    attachAttackListeners(rightContainer);
  };

  };

  return {
    updatePlayerGrid,
    renderPlayerGrids,
    toggleGameover,
  };
})();

export default UI;
