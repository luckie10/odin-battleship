import Gameboard from "./gameboard.js";
import Player from "./player.js";

let gameboard;
let player;
let fleet;

beforeEach(() => {
  gameboard = Gameboard();
  player = Player(gameboard);
  fleet = player.get("fleet");
});

describe("placeShip function", () => {
  test("Place horizontal ship", () => {
    const cruiser = fleet["cruiser"];
    gameboard.placeShip("00", cruiser);
    expect(gameboard.get("board").get("00")).toBe(cruiser);
    expect(gameboard.get("board").get("01")).toBe(cruiser);
    expect(gameboard.get("board").get("02")).toBe(cruiser);
  });

  test("Place vertical ship", () => {
    const cruiser = fleet["cruiser"];
    cruiser.toggleVertical();
    gameboard.placeShip("00", cruiser);
    expect(gameboard.get("board").get("00")).toBe(cruiser);
    expect(gameboard.get("board").get("10")).toBe(cruiser);
    expect(gameboard.get("board").get("20")).toBe(cruiser);
  });

  test("Ships cannot overlap locations", () => {
    const cruiser = fleet["cruiser"];
    const battleship = fleet["battleship"];
    battleship.toggleVertical();
    gameboard.placeShip("01", cruiser);
    expect(gameboard.placeShip("03", battleship)).toBe(false);
  });

  test("Reject out of bounds ship", () => {
    expect(gameboard.placeShip("18", fleet["battleship"])).toBe(false);
  });
});

describe("recieveAttack function", () => {
  beforeEach(() => {
    gameboard.placeShip("25", fleet["battleship"]);
  });

  test("Attack hits a ship", () => {
    const board = gameboard.get("board");
    expect(board.get("26")).toBe(fleet["battleship"]);
    expect(board.get("28")).toBe(fleet["battleship"]);
    gameboard.recieveAttack("26");
    gameboard.recieveAttack("28");
    expect(board.get("26")).toBe("hit");
    expect(board.get("28")).toBe("hit");
  });

  test("Attack missed", () => {
    const board = gameboard.get("board");
    expect(board.get("01")).toBe(null);
    gameboard.recieveAttack("01");
    expect(board.get("01")).toBe("miss");
  });
});

describe("hasActiveShips function", () => {
  beforeEach(() => {
    gameboard.placeShip("25", fleet["battleship"]);
  });

  test("has active ships", () => {
    expect(gameboard.hasActiveShips()).toBe(true);
  });

  test("no active ships", () => {
    expect(gameboard.hasActiveShips()).toBe(true);
    gameboard.recieveAttack("25");
    gameboard.recieveAttack("26");
    gameboard.recieveAttack("27");
    gameboard.recieveAttack("28");
    expect(gameboard.hasActiveShips()).toBe(false);
  });
});
