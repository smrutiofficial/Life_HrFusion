const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowedFormats: ["jpeg", "jpg", "png", "gif"],
    transformation: [
      { quality: "auto" },
    ],
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 800 * 1024 }, // Limit file size to 800KB
});

module.exports = { upload };