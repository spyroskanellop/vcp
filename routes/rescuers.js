var express = require('express');
var router = express.Router();
var rescuerController = require('../controllers/rescuerController');

router.route('/')
  .get(rescuerController.getAllRescuers)
  .post(rescuerController.createNewRescuer)
  .put(rescuerController.updateRescuer)
  .delete(rescuerController.deleteRescuer);

router.route('/:id')
  .get(rescuerController.getRescuer);  

module.exports = router;
