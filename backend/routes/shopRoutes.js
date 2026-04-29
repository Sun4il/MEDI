const express = require("express");
const {
  createShop,
  deleteShop,
  getShopById,
  listShops,
  updateShop,
} = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", listShops);
router.get("/:id", getShopById);
router.post("/", protect, authorizeRoles("shop", "admin"), createShop);
router.patch("/:id", protect, authorizeRoles("shop", "admin"), updateShop);
router.delete("/:id", protect, authorizeRoles("shop", "admin"), deleteShop);

module.exports = router;