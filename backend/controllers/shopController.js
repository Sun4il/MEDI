const Shop = require("../models/Shop");
const { buildGeoPoint } = require("../services/geoService");

const parseBoolean = (value) => value === true || value === "true" || value === "1";

const buildLocation = (body) => {
  if (Array.isArray(body.coordinates) && body.coordinates.length >= 2) {
    return {
      type: "Point",
      coordinates: body.coordinates.map(Number),
    };
  }

  if (body.latitude !== undefined && body.longitude !== undefined) {
    return buildGeoPoint(body.latitude, body.longitude);
  }

  return null;
};

const listShops = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("owner").sort({ createdAt: -1 }).lean();
    return res.json({ count: shops.length, shops });
  } catch (error) {
    next(error);
  }
};

const getShopById = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("owner");

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.json({ shop });
  } catch (error) {
    next(error);
  }
};

const createShop = async (req, res, next) => {
  try {
    const location = buildLocation(req.body);

    if (!location) {
      return res.status(400).json({ message: "Shop location is required" });
    }

    const shop = await Shop.create({
      name: req.body.name,
      owner: req.body.owner || req.user?._id,
      email: req.body.email || "",
      phone: req.body.phone || "",
      address: req.body.address || "",
      location,
      image: {
        url: req.body.imageUrl || "",
        publicId: req.body.imagePublicId || "",
        provider: req.body.imageProvider || "cloudinary",
      },
      openingHours: req.body.openingHours || "",
      isVerified: parseBoolean(req.body.isVerified),
    });

    return res.status(201).json({ shop });
  } catch (error) {
    next(error);
  }
};

const updateShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const location = buildLocation(req.body);

    ["name", "email", "phone", "address", "openingHours"].forEach((field) => {
      if (req.body[field] !== undefined) {
        shop[field] = req.body[field];
      }
    });

    if (location) {
      shop.location = location;
    }

    if (req.body.isVerified !== undefined) {
      shop.isVerified = parseBoolean(req.body.isVerified);
    }

    if (req.body.imageUrl || req.body.imagePublicId) {
      shop.image = {
        url: req.body.imageUrl || shop.image?.url || "",
        publicId: req.body.imagePublicId || shop.image?.publicId || "",
        provider: req.body.imageProvider || shop.image?.provider || "cloudinary",
      };
    }

    await shop.save();

    return res.json({ shop });
  } catch (error) {
    next(error);
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    await shop.deleteOne();

    return res.json({ message: "Shop deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
};