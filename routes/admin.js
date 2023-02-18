const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');


console.log("admin");
// router.post('/insert',adminController.insert)
router.get('/add',adminController.addData)

router.post('/insert',adminController.insert)


module.exports = router;