var express = require("express");
var router = express.Router();

var dashboardController = require('../controllers/dashboardController');

router.get('/pilotos', function(req, res) {
    dashboardController.pilotosVotos(req, res);
});

module.exports = router;