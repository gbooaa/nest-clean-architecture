export const zeroFill = (number: number, width: number) => {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(`${number}`) ? 2 : 1)).join('0') + number;
  }
  return `${number}`;
};
