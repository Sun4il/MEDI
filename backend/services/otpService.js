const crypto = require("node:crypto");

const generateOtp = (length = 6) => {
  const minimum = 10 ** (length - 1);
  const maximum = 10 ** length;

  return crypto.randomInt(minimum, maximum).toString();
};

const hashOtp = (otp) => crypto.createHash("sha256").update(String(otp)).digest("hex");

module.exports = {
  generateOtp,
  hashOtp,
};