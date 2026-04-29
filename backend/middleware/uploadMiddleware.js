const fs = require("node:fs");
const path = require("node:path");
const multer = require("multer");

const uploadRoot = path.join(__dirname, "..", "uploads");
const prescriptionUploadDir = path.join(uploadRoot, "prescriptions");

fs.mkdirSync(prescriptionUploadDir, { recursive: true });

const isAllowedImageMimeType = (mimeType) => /^image\/(png|jpe?g|webp|avif|gif)$/i.test(mimeType || "");

const fileFilter = (req, file, callback) => {
  if (isAllowedImageMimeType(file.mimetype)) {
    callback(null, true);
    return;
  }

  callback(new Error("Only image files are allowed"), false);
};

const medicineImageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("image");

const prescriptionImageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, prescriptionUploadDir);
    },
    filename: (req, file, callback) => {
      const safeName = file.originalname.replace(/\s+/g, "-");
      callback(null, `${Date.now()}-${safeName}`);
    },
  }),
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
}).single("prescription");

module.exports = {
  medicineImageUpload,
  prescriptionImageUpload,
  isAllowedImageMimeType,
};
