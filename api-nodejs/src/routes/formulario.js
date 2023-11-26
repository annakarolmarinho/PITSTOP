var express = require("express");
var router = express.Router();

var formulario = require("../controllers/formularioControllers");


router.post("/enviarFormulario", function (req, res) {
    formulario.enviarFormulario(req, res);
});

module.exports = router;