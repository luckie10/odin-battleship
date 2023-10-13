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

  const getGameboard = () => gameboard;

  const resetGameboard = () => (gameboard = Gameboard());

  const getRandomRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const placeRandomAttack = () => {
    let randomIndex = Math.floor(
      getRandomRange(0, gameboard.attackableCoords.length)
    );
    let randomCoord = gameboard.attackableCoords[randomIndex];

    const result = gameboard.recieveAttack(randomCoord);
    return {
      result,
      coord: randomCoord,
    };
  };

  const recieveAttack = (coord) => gameboard.recieveAttack(coord);

  return {
    ...stateAccess(state),
    getGameboard,
    resetGameboard,
    placeRandomAttack,
    recieveAttack,
  };
};

export default Player;
