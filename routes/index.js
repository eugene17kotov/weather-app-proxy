const express = require('express');
const router = express.Router();
const ctrlWrapper = require('../ctrlWrapper.js');
const proxyController = require('../proxyController.js');

router.get('/', ctrlWrapper(proxyController));

module.exports = router;
