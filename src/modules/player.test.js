import Player from "./player";
import Gameboard from "./gameboard";

let gameboard;
let defender;

beforeEach(() => {
  gameboard = Gameboard();
  defender = Player(gameboard, "defender");
});

test("Place an attack that misses", () => {
  expect(defender.placeRandomAttack().result).toBe("miss");
});

test("Place an attack that hits", () => {
  const ship = defender.get("fleet")["cruiser"];
  gameboard.placeShip("00", ship);
  expect(defender.recieveAttack("01")).toBe("hit");
});

test("Place fleet randomly", () => {
  defender.placeFleetRandomly();
  expect(gameboard.isFleetPlaced()).toBe(true);
});
