import Gameboard from "./gameboard.js";
import Player from "./player.js";

let gb;
let player;
let fleet;

beforeAll(() => {
  gb = Gameboard();
  player = Player(gb);
  fleet = player.get("fleet");
});

describe("placeShip function", () => {
  test("Place ships by calling Ship factory", () => {
    const ship = gb.placeShip(["a0", "b0", "c0"], fleet["cruiser"]);
    expect(gb.board.get("a0")).toBe(ship);
    expect(gb.board.get("b0")).toBe(ship);
    expect(gb.board.get("c0")).toBe(ship);
  });

  test("Ships cannot overlap locations", () => {
    gb.placeShip(["a1", "a2", "a3", "a4"], fleet["battleship"]);
    expect(() =>
      gb.placeShip(["a3", "b3", "c3", "d4"], fleet["battleship"])
    ).toThrow(Error);
  });

  afterAll(() => {
    gb.clearBoard();
  });
});

describe("recieveAttack function", () => {
  beforeAll(() => {
    gb.placeShip(["c5", "c6", "c7", "c8"], fleet["battleship"]);
  });

  test("Attack hits a ship", () => {
    gb.recieveAttack("c6");
    gb.recieveAttack("c8");
    expect(gb.board.get("c6")).toBe("hit");
    expect(gb.board.get("c8")).toBe("hit");
  });

  test("Attack missed", () => {
    gb.recieveAttack("a1");
    expect(gb.board.get("a1")).toBe("miss");
  });
});

describe("hasActiveShips function", () => {
  test("has active ships", () => {
    expect(gb.hasActiveShips()).toBe(true);
  });

  test("no active ships", () => {
    gb.recieveAttack("c5");
    gb.recieveAttack("c7");
    expect(gb.hasActiveShips()).toBe(false);
  });
});
