const path = require("node:path");

const extractPrescriptionText = async (filePath) => {
  if (!filePath) {
    throw new Error("Prescription file path is required");
  }

  return {
    provider: "placeholder",
    text: `OCR is not configured yet for ${path.basename(filePath)}`,
    confidence: 0,
  };
};

module.exports = {
  extractPrescriptionText,
};