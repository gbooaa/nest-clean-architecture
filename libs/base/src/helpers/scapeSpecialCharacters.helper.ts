/**
 * Returns string for use in a regex escaping special characters
 */
export const escapeSpecialCharacters = (entry: string): string => {
  return entry.replace(/[[\]*+?{}.()^$|\\-]/g, '\\$&');
};
