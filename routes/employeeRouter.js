const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const validator = require('../validator/employeeValidator');

router.post('/createEmployee', validator.createEmployeeValidator, employeeController.createEmployee);

module.exports = router;
