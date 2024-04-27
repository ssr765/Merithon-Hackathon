const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const upload = multer();

// const OpenAI = require("openai");
// const openai = new OpenAI();

module.exports = router.post("/procesar", upload.any(), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Procesado completado" });
});
