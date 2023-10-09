import UI from "./ui";
import Gameboard from "./gameboard";
import Player from "./player";

const Game = (() => {
  const player = Player(Gameboard(), "player");
  const opponent = Player(Gameboard(), "opponent");

  UI.renderShipPlacement(player);
  // UI.renderPlayerGrids(player, opponent);

  const getPlayer = () => player;
  const getOpponent = () => opponent;

  const checkState = () => {
    if (!opponent.getGameboard().hasActiveShips())
      UI.toggleGameover("You Win!");

    const { result, coord } = player.placeRandomAttack();

    UI.updatePlayerGrid(result, coord);

    if (!player.getGameboard().hasActiveShips()) UI.toggleGameover("You Lose!");
  };

  return {
    checkState,
    getPlayer,
    getOpponent,
  };
})();

export default Game;
