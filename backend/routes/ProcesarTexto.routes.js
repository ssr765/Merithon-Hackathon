const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer');
const upload = multer();

// const OpenAI = require("openai");
// const openai = new OpenAI();

module.exports = router

    .post('/procesar', (req, res) => {
        const audioFile = req.body
        console.log(audioFile)
        // async function transcribir() {
        //     const transcription = await openai.audio.transcriptions.create({
        // file: fs.createReadStream("/path/to/file/speech.mp3"),
        // model: "whisper-1",
        // response_format: "text",
        // });
        // console.log(transcription.text);
        // }

        // transcribir();
        res.json({ message: 'Procesar Texto' })
    })





