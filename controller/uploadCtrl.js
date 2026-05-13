const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (filePath) => cloudinaryUploadImg(filePath, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path: originalPath } = file;
      const webpPath = originalPath.replace(/\.\w+$/, ".webp");

      await sharp(originalPath)
        .webp({ quality: 80 })
        .toFile(webpPath);


      const newpath = await uploader(webpPath);
      urls.push(newpath);

      fs.unlinkSync(originalPath);
      fs.unlinkSync(webpPath);
    }

    res.json(urls);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { uploadImages, deleteImages };
