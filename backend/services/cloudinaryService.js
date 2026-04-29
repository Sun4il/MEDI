const { cloudinary } = require("../config/cloudinary");

const mapCloudinaryImage = (uploadResult) => ({
  url: uploadResult.secure_url,
  publicId: uploadResult.public_id,
  provider: "cloudinary",
});

const uploadMedicineImage = (file, folder = "smart-medicine-finder/medicines") => {
  if (!file || !file.buffer) {
    return Promise.reject(new Error("Medicine image file buffer is required"));
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(mapCloudinaryImage(result));
      },
    );

    uploadStream.end(file.buffer);
  });
};

const deleteMedicineImage = async (publicId) => {
  if (!publicId) {
    return null;
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};

module.exports = {
  uploadMedicineImage,
  deleteMedicineImage,
  mapCloudinaryImage,
};
