const mongoose = require("mongoose");

const medicineImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      default: "cloudinary",
    },
    altText: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genericName: {
      type: String,
      trim: true,
      default: "",
    },
    brand: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "general",
    },
    dosageForm: {
      type: String,
      default: "tablet",
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
    },
    image: {
      type: medicineImageSchema,
      default: null,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    ratingAverage: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

medicineSchema.index({ name: "text", genericName: "text", brand: "text", category: "text" });

medicineSchema.virtual("isAvailable").get(function isAvailable() {
  return this.stock > 0;
});

medicineSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Medicine", medicineSchema);
