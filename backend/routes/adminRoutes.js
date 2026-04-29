const express = require("express");
const {
  deleteUser,
  getAnalytics,
  getPendingShops,
  listUsers,
  verifyShop,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/analytics", protect, authorizeRoles("admin"), getAnalytics);
router.get("/users", protect, authorizeRoles("admin"), listUsers);
router.get("/shops/pending", protect, authorizeRoles("admin"), getPendingShops);
router.patch("/shops/:id/verify", protect, authorizeRoles("admin"), verifyShop);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;