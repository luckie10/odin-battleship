function Ship(length) {
  let hp = length;

  const hit = () => (hp-- > 0 ? true : false);

  const isSunk = () => hp <= 0;

  return {
    length,
    hit,
    isSunk,
  };
}

export default Ship;
