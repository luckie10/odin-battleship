import { createElement, removeAllChildren } from "../util";
import Game from "./game";

import "../style.scss";

const UI = (() => {
  const playerGridContainer = document.querySelector(".player-grid-container");
  const opponentGridContainer = document.querySelector(
    ".opponent-grid-container"
  );
  const container = document.querySelector(".game-over-container");
  const message = container.querySelector(".message");
  const againButton = container.querySelector(".again");

  const resetGame = () => {
    const player = Game.player;
    const opp = Game.opponent;

    player.setGameboard();
    opp.setGameboard();

    clearPlayerGrids();
    renderPlayerGrids(player, opp);
    toggleGameover();
  };

  againButton.addEventListener("click", resetGame);

  const toggleGameover = (msg) => {
    message.textContent = msg;
    container.classList.toggle("invisible");
  };

  const updatePlayerGrid = (result, coord) => {
    const cell = playerGridContainer.querySelector(`.grid .cell-${coord}`);
    cell.classList.add(result);
  };

  const sendAttack = (opponent, key, target) => {
    const result = opponent.recieveAttack(key);

    if (result) target.classList.add(result);
    Game.checkState();
  };

  const generateCell = (value, key, player, isPlayer) => {
    const cell = createElement("div", { class: `grid-cell cell-${key}` });

    if (value === "hit" || value === "miss") cell.classList.add(value);
    else if (value) {
      if (isPlayer) cell.classList.add("ship");
      else
        cell.addEventListener("click", () => sendAttack(player, key, cell), {
          once: true,
        });
    } else {
      if (!isPlayer)
        cell.addEventListener("click", () => sendAttack(player, key, cell), {
          once: true,
        });
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
      grid.append(generateCell(value, key, player, isPlayer))
    );

    return grid;
  };

  const clearPlayerGrids = () => {
    removeAllChildren(playerGridContainer);
    removeAllChildren(opponentGridContainer);
  };

  const renderPlayerGrids = (player, opponent) => {
    playerGridContainer.append(generateGrid(player, true));
    opponentGridContainer.append(generateGrid(opponent, false));
  };

  return {
    updatePlayerGrid,
    renderPlayerGrids,
    toggleGameover,
  };
})();

export default UI;
