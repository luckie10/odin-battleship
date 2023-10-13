import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";

test("Place an attack that misses", () => {
  const defeneder = Player(Gameboard(), "defender");
  expect(defeneder.placeRandomAttack().result).toBe("miss");
});

test("Place an attack that hits", () => {
  const board = Gameboard();
  const defender = Player(board, "defender");
  const ship = defender.get("fleet")["cruiser"];
  board.placeShip(["00", "01", "02"], ship);
  expect(defender.recieveAttack("01")).toBe("hit");
});
