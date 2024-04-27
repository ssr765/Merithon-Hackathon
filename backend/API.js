
const express = require("express");
const cors = require("cors");
const ProcesarTexto = require("./routes/ProcesarTexto.routes");
const mostrarRutas = require("./utils/index");
const bodyParser = require('body-parser')

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// routes 
app.use("/api", ProcesarTexto);

console.log("##### RUTAS #####");
mostrarRutas(app);
console.log("### FIN RUTAS ###");

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
