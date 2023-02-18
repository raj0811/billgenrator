const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const homeController = require('../controllers/home_controller');



// setv routes
router.get('/',homeController.home);
router.get('/genrate',homeController.genrateInvoice);
router.post('/datainset',homeController.addData);
router.use('/admin',require('./admin'))
router.get('/delete-item/',homeController.deleteItem)
router.get('/pdf',homeController.pdf)

module.exports = router; 