const Medicine = require("../models/Medicine");
const Shop = require("../models/Shop");
const User = require("../models/User");

const getAnalytics = async (req, res, next) => {
  try {
    const [userCount, shopCount, medicineCount, verifiedShopCount] = await Promise.all([
      User.countDocuments(),
      Shop.countDocuments(),
      Medicine.countDocuments(),
      Shop.countDocuments({ isVerified: true }),
    ]);

    return res.json({
      users: userCount,
      shops: shopCount,
      medicines: medicineCount,
      verifiedShops: verifiedShopCount,
    });
  } catch (error) {
    next(error);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    return res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

const verifyShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: true,
      },
      { new: true },
    );

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.json({ shop });
  } catch (error) {
    next(error);
  }
};

const getPendingShops = async (req, res, next) => {
  try {
    const shops = await Shop.find({ isVerified: false }).populate("owner").sort({ createdAt: -1 });
    return res.json({ count: shops.length, shops });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics,
  listUsers,
  deleteUser,
  verifyShop,
  getPendingShops,
};