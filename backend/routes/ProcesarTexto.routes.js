const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const OpenAI = require("openai");

// const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "sk-proj-hdEFdG5q1WW940Wa7ZcxT3BlbkFJCuBoh1M6G4TaiLuhYk1q",
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
    "Make a summary of this meeting in a formal tone higlighting the key points in spanish:";
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: sysPrompt + transcription.text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return res.json({ summary: completion.choices[0].message.content });
});
