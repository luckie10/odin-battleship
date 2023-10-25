import UI from "./ui";
import Gameboard from "./gameboard";
import Player from "./player";

const Game = (() => {
  const player = Player(Gameboard(), "player");
  const opponent = Player(Gameboard(), "opponent");
  opponent.placeFleetRandomly();

  UI.renderShipPlacement(player);

  const getPlayer = () => player;
  const getOpponent = () => opponent;

  const checkState = () => {
    if (!opponent.get("gameboard").hasActiveShips())
      UI.toggleGameover("You Win!");

    const { result, coord } = player.placeRandomAttack();

    UI.updatePlayerGrid(result, coord);

    if (!player.get("gameboard").hasActiveShips())
      UI.toggleGameover("You Lose!");
  };

  return {
    checkState,
    getPlayer,
    getOpponent,
  };
})();

export default Game;
