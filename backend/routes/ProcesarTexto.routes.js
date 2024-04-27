const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const OpenAI = require("openai");
require("dotenv").config();

// const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to store the files
      cb(null, "upload/");
    },
    filename: function (req, file, cb) {
      // Generate a unique filename (you can use originalname if you want)
      cb(null, file.originalname);
    },
  }),
});

module.exports = router.post("/procesar", upload.any(), async (req, res) => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("upload/audio.ogg"),
    model: "whisper-1",
  });

  console.log(transcription.text);

  const sysPrompt =
    "Make a summary in spanish of this meeting using a list format, highligh the key points using a maximum of 10:";
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant who is a very capable meeting summarizer" },
      {
        role: "user",
        content: sysPrompt + transcription.text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return res.json({ summary: completion.choices[0].message.content });
});
