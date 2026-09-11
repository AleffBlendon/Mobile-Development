export function getFinalPrice(price: number, discountPercentage: number) {
  return price * (1 - discountPercentage / 100);
}

export function formatUsd(value: number) {
  return `$${value.toFixed(2)}`;
}

export function hasDiscount(discountPercentage: number) {
  return discountPercentage >= 1;
}
