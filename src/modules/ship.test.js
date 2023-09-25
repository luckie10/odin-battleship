import Ship from "./ship.js";

let ship;
describe("ship params", () => {
  beforeAll(() => {
    ship = Ship(3);
  });

  test("Ship has a length", () => {
    expect(ship.length).toBe(3);
  });
});

describe("ship functions", () => {
  beforeAll(() => {
    ship = Ship(3);
  });

  test("Accepts a hit", () => {
    expect(ship.hit()).toBe(true);
    expect(ship.hit()).toBe(true);
  });
  test("Shows that the ship is not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });
  test("Shows that the ship is sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
  test("Reject a hit, already sunk", () => {
    expect(ship.hit()).toBe(false);
  });
});
