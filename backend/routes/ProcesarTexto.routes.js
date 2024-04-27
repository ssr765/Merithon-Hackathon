const express = require('express');
const router = express.Router();

module.exports = router
.get('/procesar', (req, res) => {
    res.send('Procesar Texto')
})