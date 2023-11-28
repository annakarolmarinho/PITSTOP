var express = require("express");
var router = express.Router();

var formulario = require("../controllers/formularioControllers");


router.post("/enviarFormulario", function (req, res) {
    formulario.enviarFormulario(req, res);
});

router.post("/filtrarFormulario", function (req, res){
    formulario.filtrarFormulario(req, res);
});

router.get('/', function(req, res) {
    formulario.obterFormularioUsuario(req, res);
})

module.exports = router;