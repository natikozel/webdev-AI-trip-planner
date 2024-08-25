const imageController = require('../controllers/imageController');
const express = require('express');
const router = express.Router();


router.post('/save-image', imageController.saveImage);

module.exports = router