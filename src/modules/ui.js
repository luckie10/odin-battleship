import { createElement } from "../util";
import Game from "./game";

import "../style.scss";

const UI = (() => {
  const playerGridContainer = document.querySelector(".player-grid-container");
  const opponentGridContainer = document.querySelector(
    ".opponent-grid-container"
  );

  const showGameover = (msg) => {
    const container = document.querySelector(".game-over-container");
    const message = container.querySelector(".message");

    message.textContent = msg;
    container.classList.remove("invisible");
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

  const renderPlayerGrid = (player) =>
    playerGridContainer.append(generateGrid(player, true));

  const renderOpponentGrid = (player) =>
    opponentGridContainer.append(generateGrid(player, false));

  return {
    updatePlayerGrid,
    renderPlayerGrid,
    renderOpponentGrid,
    showGameover,
  };
})();

export default UI;
