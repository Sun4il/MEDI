const Medicine = require("../models/Medicine");
const { deleteMedicineImage, uploadMedicineImage } = require("../services/cloudinaryService");
const { getDistanceKm } = require("../services/geoService");
const { calculateMedicineScore, sortByBestMatch } = require("../utils/scoring");

const escapeRegExp = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseTags = (value) => {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const parseBoolean = (value) => value === true || value === "true" || value === "1";

const parseNumber = (value, fallback = 0) => {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? fallback : numericValue;
};

const listMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.find().populate("shop").sort({ createdAt: -1 }).lean();

    return res.json({ count: medicines.length, medicines });
  } catch (error) {
    next(error);
  }
};

const searchMedicines = async (req, res, next) => {
  try {
    const { type = "best", q = "", lat, lng } = req.query;
    const query = {};

    if (q) {
      const searchRegex = new RegExp(escapeRegExp(q), "i");
      query.$or = [
        { name: searchRegex },
        { genericName: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
      ];
    }

    const medicines = await Medicine.find(query).populate("shop").lean();

    const enrichedMedicines = medicines.map((medicine) => {
      const distanceKm = getDistanceKm({
        latitude: lat,
        longitude: lng,
        coordinates: medicine.shop?.location?.coordinates,
      });

      const score = calculateMedicineScore({
        price: medicine.price,
        distanceKm,
        ratingAverage: medicine.ratingAverage,
        stock: medicine.stock,
      });

      return {
        ...medicine,
        distanceKm,
        score,
      };
    });

    const results =
      type === "nearest"
        ? [...enrichedMedicines].sort((left, right) => {
            const leftDistance = left.distanceKm ?? Number.POSITIVE_INFINITY;
            const rightDistance = right.distanceKm ?? Number.POSITIVE_INFINITY;

            if (leftDistance !== rightDistance) {
              return leftDistance - rightDistance;
            }

            return (left.price ?? 0) - (right.price ?? 0);
          })
        : sortByBestMatch(enrichedMedicines);

    return res.json({
      type,
      count: results.length,
      results,
    });
  } catch (error) {
    next(error);
  }
};

const getMedicineById = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate("shop");

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    return res.json({ medicine });
  } catch (error) {
    next(error);
  }
};

const createMedicine = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Medicine image is required" });
    }

    const shopId = req.body.shop || req.body.shopId || req.user?.shop;

    if (!shopId) {
      return res.status(400).json({ message: "Shop is required" });
    }

    const image = await uploadMedicineImage(req.file);

    const medicine = await Medicine.create({
      name: req.body.name,
      genericName: req.body.genericName || "",
      brand: req.body.brand || "",
      description: req.body.description || "",
      category: req.body.category || "general",
      dosageForm: req.body.dosageForm || "tablet",
      price: parseNumber(req.body.price),
      stock: parseNumber(req.body.stock),
      requiresPrescription: parseBoolean(req.body.requiresPrescription),
      image,
      shop: shopId,
      tags: parseTags(req.body.tags),
      ratingAverage: parseNumber(req.body.ratingAverage),
      reviewCount: parseNumber(req.body.reviewCount),
    });

    return res.status(201).json({ medicine });
  } catch (error) {
    next(error);
  }
};

const updateMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (req.file) {
      if (medicine.image?.publicId) {
        await deleteMedicineImage(medicine.image.publicId);
      }

      medicine.image = await uploadMedicineImage(req.file);
    }

    const updatableFields = [
      "name",
      "genericName",
      "brand",
      "description",
      "category",
      "dosageForm",
      "shop",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        medicine[field] = req.body[field];
      }
    });

    if (req.body.price !== undefined) {
      medicine.price = parseNumber(req.body.price, medicine.price);
    }

    if (req.body.stock !== undefined) {
      medicine.stock = parseNumber(req.body.stock, medicine.stock);
    }

    if (req.body.requiresPrescription !== undefined) {
      medicine.requiresPrescription = parseBoolean(req.body.requiresPrescription);
    }

    if (req.body.tags !== undefined) {
      medicine.tags = parseTags(req.body.tags);
    }

    if (req.body.ratingAverage !== undefined) {
      medicine.ratingAverage = parseNumber(req.body.ratingAverage, medicine.ratingAverage);
    }

    if (req.body.reviewCount !== undefined) {
      medicine.reviewCount = parseNumber(req.body.reviewCount, medicine.reviewCount);
    }

    await medicine.save();

    return res.json({ medicine });
  } catch (error) {
    next(error);
  }
};

const deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (medicine.image?.publicId) {
      await deleteMedicineImage(medicine.image.publicId);
    }

    await medicine.deleteOne();

    return res.json({ message: "Medicine deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listMedicines,
  searchMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};