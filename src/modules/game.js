import UI from "./ui";
import Gameboard from "./gameboard";
import Player from "./player";

const Game = (() => {
  const aBoard = Gameboard();
  aBoard.placeShip(["25", "35", "45", "55", "65"]);
  aBoard.placeShip(["16", "17", "18", "19"]);
  aBoard.placeShip(["81", "82", "83"]);
  aBoard.placeShip(["89", "79", "69"]);
  aBoard.placeShip(["13", "23"]);
  aBoard.recieveAttack("00");
  aBoard.recieveAttack("35");

  const oppBoard = Gameboard();
  oppBoard.placeShip(["13", "23"]);

  const player = Player(aBoard, "player");
  const opponent = Player(oppBoard, "opponent");

  UI.renderPlayerGrid(player);
  UI.renderOpponentGrid(opponent);

  const checkState = () => {
    if (!opponent.gameboard.hasActiveShips()) UI.showGameover("You Win!");

    const { result, coord } = player.placeRandomAttack();

    UI.updatePlayerGrid(result, coord);

    if (!player.gameboard.hasActiveShips()) UI.showGameover("You Lose!");
  };

  return {
    checkState,
  };
})();

export default Game;
