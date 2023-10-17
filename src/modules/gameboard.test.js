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
    const ship = gb.placeShip(["00", "10", "20"], fleet["cruiser"]);
    expect(gb.get("board").get("00")).toBe(ship);
    expect(gb.get("board").get("10")).toBe(ship);
    expect(gb.get("board").get("20")).toBe(ship);
  });

  test("Ships cannot overlap locations", () => {
    gb.placeShip(["01", "02", "03", "04"], fleet["battleship"]);
    expect(() =>
      gb.placeShip(["03", "13", "23", "34"], fleet["battleship"]),
    ).toThrow(Error);
  });

  test("Reject out of bounds ship", () => {
    expect(() =>
      gb.placeShip(["18", "19", "110", "111"], fleet["battleship"]),
    ).toThrow(Error);
  });

  afterAll(() => {
    gb.clearBoard();
  });
});

describe("recieveAttack function", () => {
  beforeAll(() => {
    gb.placeShip(["25", "26", "27", "28"], fleet["battleship"]);
  });

  test("Attack hits a ship", () => {
    gb.recieveAttack("26");
    gb.recieveAttack("28");
    expect(gb.get("board").get("26")).toBe("hit");
    expect(gb.get("board").get("28")).toBe("hit");
  });

  test("Attack missed", () => {
    gb.recieveAttack("01");
    expect(gb.get("board").get("01")).toBe("miss");
  });
});

describe("hasActiveShips function", () => {
  test("has active ships", () => {
    expect(gb.hasActiveShips()).toBe(true);
  });

  test("no active ships", () => {
    gb.recieveAttack("25");
    gb.recieveAttack("27");
    expect(gb.hasActiveShips()).toBe(false);
  });
});
