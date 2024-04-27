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

const promptVariants = {
  resumen:
    "de una manera clara y concisa para dejar claro todo lo que se ha dicho en la reunión.",
  puntos:
    "con lo que se ha mencionado en formato de apartados más importantes y además vas a tener que describir cada uno de estos puntos pero sin excederte demasiado, como máximo en 100 palabras y expresando todo esto de manera clara y concisa",
  coloquial:
    "de manera que se exprese todo lo que se ha querido decir en la reunión sin tecnicismos y con vocabulario facilmente entendible para todo el mundo.",
};

module.exports = router.post("/procesar", upload.any(), async (req, res) => {
  // get formdata params
  const { mode } = req.body;
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("upload/audio.ogg"),
    model: "whisper-1",
  });

  console.log(transcription.text);

  const basePrompt = `Eres un asistente espectador de la reunión que escucha todo lo que se ha dicho en la misma, tú función es resumir la reunión ${promptVariants[mode]}. No incluyas información que no se haya mencionado en la reunión. La reunión que debes resumir es la siguiente: `;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful spanish assistant who is a very capable meeting summarizer",
      },
      {
        role: "user",
        content: basePrompt + transcription.text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return res.json({ summary: completion.choices[0].message.content });
});
