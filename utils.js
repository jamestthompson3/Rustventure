function genRandNum(num) {
  return (
    Math.random() *
      Math.random() *
      10 *
      +Math.floor(Math.random() * 200, Math.random() * 150) -
    Math.random() * 10 * (num + Math.random() * 3)
  );
}

export function genRandCoord(num, max) {
  let rand = genRandNum(num);
  if (rand > max) {
    while (rand > max) {
      rand = max - rand - genRandNum(rand);
    }
  }
  return rand < 0 ? -rand : rand;
}
