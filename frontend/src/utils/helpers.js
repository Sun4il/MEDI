export const joinClasses = (...classes) => classes.filter(Boolean).join(" ");

export const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  return String(value)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export const isEmpty = (value) => value === undefined || value === null || value === "";