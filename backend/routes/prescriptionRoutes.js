const express = require("express");
const { uploadPrescription } = require("../controllers/prescriptionController");
const { protect } = require("../middleware/authMiddleware");
const { prescriptionImageUpload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", protect, prescriptionImageUpload, uploadPrescription);

module.exports = router;