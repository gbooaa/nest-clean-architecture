export const currencyFormatter = (data: { currency: string; value: number }) => {
  const { currency, value } = data;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency,
  });

  return formatter.format(value);
};
