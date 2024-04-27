const express = require('express');
const router = express.Router();

module.exports = router
.post('/procesar', (req, res) => {
    res.send('Procesar Texto')
})