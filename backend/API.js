const express = require("express");
const cors = require("cors");
const ProcesarTexto = require("./routes/ProcesarTexto.routes");
const mostrarRutas = require("./utils/index");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Config
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Rutas
app.use("/api", ProcesarTexto);

console.log("##### RUTAS #####");
mostrarRutas(app);
console.log("### FIN RUTAS ###");

// Driver
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
