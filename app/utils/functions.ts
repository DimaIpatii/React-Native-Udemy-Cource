export const generateRundomNumberRange = (
  min: number,
  max: number,
  exclude: number
): number => {
  const number = Math.floor(Math.random() * (max - min) + min);

  if (number === exclude) {
    return generateRundomNumberRange(min, max, exclude);
  } else {
    return number;
  }
};
