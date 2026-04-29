export const formatCurrency = (value, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatDistance = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return "--";
  }

  const numeric = Number(value);

  if (numeric < 1) {
    return `${Math.round(numeric * 1000)} m`;
  }

  return `${numeric.toFixed(1)} km`;
};

export const formatDate = (value) => new Date(value).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});