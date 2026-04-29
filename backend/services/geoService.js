const EARTH_RADIUS_KM = 6371;

const toRadians = (value) => (Number(value) * Math.PI) / 180;

const extractCoordinates = (location) => {
  if (!location) {
    return null;
  }

  if (Array.isArray(location)) {
    return location;
  }

  if (Array.isArray(location.coordinates)) {
    return location.coordinates;
  }

  return null;
};

const getDistanceKm = ({ latitude, longitude, coordinates }) => {
  const originLatitude = Number(latitude);
  const originLongitude = Number(longitude);
  const shopCoordinates = extractCoordinates(coordinates);

  if (
    Number.isNaN(originLatitude) ||
    Number.isNaN(originLongitude) ||
    !shopCoordinates ||
    shopCoordinates.length < 2
  ) {
    return null;
  }

  const [shopLongitude, shopLatitude] = shopCoordinates.map(Number);
  const deltaLatitude = toRadians(shopLatitude - originLatitude);
  const deltaLongitude = toRadians(shopLongitude - originLongitude);
  const latitudeA = toRadians(originLatitude);
  const latitudeB = toRadians(shopLatitude);

  const haversineA =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.sin(deltaLongitude / 2) ** 2 * Math.cos(latitudeA) * Math.cos(latitudeB);

  const distance = 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(haversineA), Math.sqrt(1 - haversineA));

  return Number(distance.toFixed(2));
};

const buildGeoPoint = (latitude, longitude) => ({
  type: "Point",
  coordinates: [Number(longitude), Number(latitude)],
});

module.exports = {
  getDistanceKm,
  extractCoordinates,
  buildGeoPoint,
};