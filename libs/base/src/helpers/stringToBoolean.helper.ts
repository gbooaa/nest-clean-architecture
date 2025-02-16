export function stringToBoolean(str: string) {
  if (typeof str !== 'string') {
    return undefined;
  }

  switch (str.toLowerCase()) {
    case 'true':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'no':
    case '0':
      return false;

    default:
      return undefined;
  }
}
