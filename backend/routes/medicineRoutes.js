const express = require("express");
const {
  createMedicine,
  deleteMedicine,
  getMedicineById,
  listMedicines,
  searchMedicines,
  updateMedicine,
} = require("../controllers/medicineController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { medicineImageUpload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/search", searchMedicines);
router.get("/", listMedicines);
router.get("/:id", getMedicineById);
router.post("/", protect, authorizeRoles("shop", "admin"), medicineImageUpload, createMedicine);
router.patch("/:id", protect, authorizeRoles("shop", "admin"), medicineImageUpload, updateMedicine);
router.delete("/:id", protect, authorizeRoles("shop", "admin"), deleteMedicine);

module.exports = router;