var express = require("express");
var router = express.Router();

var dashboardController = require('../controllers/dashboardController');

router.get('/pilotos', function(req, res) {
    dashboardController.pilotosVotos(req, res);
});

router.get('/genero', function(req, res) {
    dashboardController.genero(req,res);
})

router.get('/respostas', function(req, res){
    dashboardController.respostas(req, res);
})

module.exports = router;