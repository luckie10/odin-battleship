import { stateAccess } from "../util";

const shipTypes = [
  "carrier",
  "battleship",
  "cruiser",
  "submarine",
  "destroyer",
];

const shipLength = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

function Ship(type, vertical = false) {
  const state = {
    vertical,
  };

  let length = shipLength[type];

  const hit = () => (length-- > 0 ? true : false);

  const isSunk = () => length <= 0;

  return {
    ...stateAccess(state),
    type,
    length,
    hit,
    isSunk,
  };
}

export { Ship as default, shipTypes };
