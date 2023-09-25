import Player from "./player";
import Gameboard from "./gameboard";

test("placing an attack on oppponent gameboard", () => {
  const attacker = Player(Gameboard(), "attacker");
  const defeneder = Player(Gameboard(), "defender");
  expect(attacker.placeRandomAttack(defeneder.gameboard)).toBe("miss");
});
