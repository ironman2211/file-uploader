const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Endpoint to add PPTX file
app.post("/add-ppt", upload.single("pptxFile"), (req, res) => {
  res.status(200).send("PPTX file added successfully");
});

// Endpoint to get PPTX file
app.get("/get-ppt/:filename", (req, res) => {
  const filename = req.params.filename;
  const pptxPath = path.join(__dirname, `upload/${filename}`);
  res.download(pptxPath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
