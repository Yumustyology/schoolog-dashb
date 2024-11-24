export function formatBalance(credit: number | undefined): string {
  if (credit === undefined) return "0";
  return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
  }).format(credit);
}
