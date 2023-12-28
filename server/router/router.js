const express = require('express');
const joiValidation = require('../middleware/joiValidation');
const router = express.Router();
const userController = require('../controller/userController');
const quoteController = require('../controller/quoteController');

router.post('/signup', joiValidation, userController.signup);
router.post('/signin',  userController.signing);
router.post('/createquote', quoteController.createQuote);
router.get('/allquote', quoteController.allQuote);
router.get('/myqoute', quoteController.myQuote);


module.exports = router;