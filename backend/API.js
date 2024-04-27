const express = require('express')

const ProcesarTexto = require('./routes/ProcesarTexto.routes')

const app = express()
const port = 3000

app.use('/api', ProcesarTexto)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})