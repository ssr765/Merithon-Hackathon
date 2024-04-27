const express = require('express');
const router = express.Router();

module.exports = router
    .post('/procesar', (req, res) => {

        console.log(req.body)
        res.send('Procesar Texto')
    })