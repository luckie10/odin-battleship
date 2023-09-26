import Player from "./player";
import Gameboard from "./gameboard";

test("Place an attack that misses", () => {
  const attacker = Player(Gameboard(), "attacker");
  const defeneder = Player(Gameboard(), "defender");
  expect(attacker.placeRandomAttack(defeneder.gameboard)).toBe("miss");
});

test("Place an attack that hits", () => {
  const attacker = Player(Gameboard(), "attacker");
  const board = Gameboard();
  board.placeShip(["00", "01", "02"]);
  const defeneder = Player(board, "defender");
  expect(attacker.placeAttack(defeneder.gameboard, "01")).toBe("hit");
});
