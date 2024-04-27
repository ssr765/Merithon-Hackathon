const express = require("express");
const cors = require("cors");
const ProcesarTexto = require("./routes/ProcesarTexto.routes");
const mostrarRutas = require("./utils/index");

const app = express();
const port = 3000;

app.use(cors());
app.use("/api", ProcesarTexto);

console.log("##### RUTAS #####");
mostrarRutas(app);
console.log("### FIN RUTAS ###");

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
