const clamp = (value, minimum, maximum) => Math.min(Math.max(Number(value), minimum), maximum);

const calculateMedicineScore = ({ price = 0, distanceKm = null, ratingAverage = 0, stock = 0 }) => {
  const priceScore = clamp(100 - Number(price), 0, 100);
  const distanceScore = distanceKm === null ? 40 : clamp(100 - Number(distanceKm) * 10, 0, 100);
  const ratingScore = clamp(Number(ratingAverage) * 20, 0, 100);
  const stockScore = Number(stock) > 0 ? 15 : 0;

  return Number((priceScore * 0.35 + distanceScore * 0.45 + ratingScore * 0.15 + stockScore * 0.05).toFixed(2));
};

const sortByBestMatch = (items) => [...items].sort((left, right) => (right.score || 0) - (left.score || 0));

module.exports = {
  calculateMedicineScore,
  sortByBestMatch,
};