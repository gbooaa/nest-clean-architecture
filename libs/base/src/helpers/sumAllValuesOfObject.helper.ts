export function sumValues(obj) {
  let totalSum = 0;
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      totalSum += sumValues(obj[prop]);
    } else if (typeof obj[prop] === 'number') {
      totalSum += obj[prop];
    }
  }
  return totalSum;
}
