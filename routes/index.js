var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //const books = Book.findAll(); 
  //res.json(books);
});

module.exports = router;
