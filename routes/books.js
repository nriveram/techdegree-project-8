var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error); 
    }
  }
}

/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll(); 
  res.render('index', { books, title: 'Books' }); 
}));


/* GET - Create new book form. */
router.get('/new', (req, res) => {
  res.render('new-book', { book: {}, title: 'New Book'})
});

/* POST - create book */
router.post('/', asyncHandler(async (req, res) => {
  let book; 
  try {
    book = await Book.create(req.body);
    res.redirect("/" + book.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render("new-book", { book: book, errors: error.errors, title: "New Book" })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    } 
  }
}));

/* GET - Show book detail form  */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render('update-book', { book: book, title: book.title });  
  } else {
    res.sendStatus(404);
  }
}));

// /* POST - Updates a book. */
// router.post('/:id', asyncHandler(async (req, res) => {
//   let book;
//   try {
//     book = await Book.findByPk(req.params.id);
//     if(book) {
//       await book.update(req.body);
//       res.redirect("/books/" + book.id); 
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     if(error.name === "SequelizeValidationError") {
//       book = await Book.build(req.body);
//       book.id = req.params.id; // make sure correct book gets updated
//       res.render("/books/" + book.id, { book, errors: error.errors, title: "Update Book" })
//     } else {
//       throw error;
//     }
//   }
// }));

// /* GET - Deletes book. */
// router.get("/:id/delete", asyncHandler(async (req, res) => {
//   const book = await Book.findByPk(req.params.id);
//   if(book) {
//     res.render("/books/" + book.id + "/delete", { book: book, title: "Delete Book" });
//   } else {
//     res.sendStatus(404);
//   }
// }));

// /* POST - Delete individual book. */
// router.post('/:id/delete', asyncHandler(async (req ,res) => {
//   const book = await Book.findByPk(req.params.id);
//   if(book) {
//     await book.destroy();
//     res.redirect("/books");
//   } else {
//     res.sendStatus(404);
//   }
// }));

module.exports = router;
