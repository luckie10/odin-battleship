function Ship(length) {
  let hp = length;

  const hit = () => (hp-- > 0 ? true : false);

  const isSunk = () => hp <= 0;

  const getLength = () => length;
  return {
    getLength,
    hit,
    isSunk,
  };
}

export default Ship;
