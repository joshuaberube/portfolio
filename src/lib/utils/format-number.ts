const wholeNumberFormatter = new Intl.NumberFormat('en-US');

export function formatNumber(value: number) {
  return wholeNumberFormatter.format(value);
}
