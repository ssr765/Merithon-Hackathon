const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const OpenAI = require("openai");

// const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: 'sk-proj-hdEFdG5q1WW940Wa7ZcxT3BlbkFJCuBoh1M6G4TaiLuhYk1q' });

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // Specify the directory where you want to store the files
            cb(null, 'audios/');
        },
        filename: function (req, file, cb) {
            // Generate a unique filename (you can use originalname if you want)
            cb(null, file.originalname + '-' + Date.now());
        }
    })
});


module.exports =
    router.post("/procesar", upload.any(), (req, res) => {



        res.json({ message: "Procesado completado" });

        console.log();

        async function main() {
            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream('audios/' + req.files[0].filename),
                model: "whisper-1",
            });
            return transcription;
        }
        const t = main();
        console.log(t)
    });
