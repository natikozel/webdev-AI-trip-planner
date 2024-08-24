const imagesGeneratorController = require('../controllers/imageGeneratorController');
const express = require('express');
const router = express.Router();


router.post('/get-image', imagesGeneratorController.fetchImage)

module.exports = router