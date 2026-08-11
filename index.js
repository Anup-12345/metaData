const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

// Multer configuration
const upload = multer({
  dest: "uploads/"
});

// Home page
app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

// File Metadata API
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});