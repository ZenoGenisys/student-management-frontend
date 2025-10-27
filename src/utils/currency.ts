/**
 * Formats a number with commas for readability (e.g., 100000 -> 1,00,000).
 * @param value The number to format.
 * @returns A string representation of the number with commas.
 */
export const formatNumberWithCommas = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '0';
  return value.toLocaleString('en-IN'); // Uses Indian numbering system (lakhs, crores)
};
