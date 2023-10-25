import { stateAccess } from "../util";
import Gameboard from "./gameboard";
import Ship, { shipTypes } from "./ship";

const generateFleet = (types) => {
  const fleet = {};
  types.forEach((type) => (fleet[type] = Ship(type)));
  return fleet;
};

const Player = (gameboard = Gameboard(), name = "") => {
  const state = {
    gameboard,
    fleet: generateFleet(shipTypes),
  };

  const getGameboard = () => state.gameboard;

  const resetGameboard = () => (state.gameboard = Gameboard());

  const resetFleet = () => (state.fleet = generateFleet(shipTypes));

  const getRandomRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const randomShipOrientation = (ship) => {
    Math.floor(getRandomRange(0, 2))
      ? state.fleet[ship].toggleVertical()
      : false;
  };

  const placeFleetRandomly = () => {
    const ships = shipTypes.slice();

    while (ships.length) {
      const ship = ships.at(-1);
      randomShipOrientation(ship);
      let randomCoord = String(Math.floor(getRandomRange(0, 100)));
      const result = state.gameboard.placeShip(randomCoord, state.fleet[ship]);
      if (result) ships.pop();
    }
  };

  const placeRandomAttack = () => {
    let randomIndex = Math.floor(
      getRandomRange(0, state.gameboard.attackableCoords.length),
    );
    let randomCoord = state.gameboard.attackableCoords[randomIndex];

    const result = state.gameboard.recieveAttack(randomCoord);
    return {
      result,
      coord: randomCoord,
    };
  };

  const recieveAttack = (coord) => state.gameboard.recieveAttack(coord);

  return {
    ...stateAccess(state),
    getGameboard,
    resetGameboard,
    resetFleet,
    placeRandomAttack,
    recieveAttack,
    placeFleetRandomly,
  };
};

export default Player;
