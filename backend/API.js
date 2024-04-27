const express = require('express')
const cors = require('cors')
const ProcesarTexto = require('./routes/ProcesarTexto.routes')






const app = express()
const port = 3000

app.use('/api', ProcesarTexto)
app.use(cors({origin: 'http://localhost:5173'}))




app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
