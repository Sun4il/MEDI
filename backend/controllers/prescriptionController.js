const { extractPrescriptionText } = require("../services/ocrService");

const uploadPrescription = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Prescription image is required" });
    }

    const ocrResult = await extractPrescriptionText(req.file.path);

    return res.status(201).json({
      message: "Prescription uploaded successfully",
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
      },
      ocr: ocrResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadPrescription,
};