export default function formatCurrency(
  value,
  currency = 'VND',
  locale = 'vi-VN'
) {
  // console.log(value);
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return 'Invalid Number';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}
