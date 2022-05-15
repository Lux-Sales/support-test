const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/alerts');

router.get('/', notificationController.find);
router.get('/:id', notificationController.findById);
router.post('/', notificationController.save);
router.put('/:id', notificationController.update);
router.delete('/:id', notificationController.remove);

module.exports = router;
