const router = require("express").Router();
const Book = require("../models/booksModel");
const authMiddleware = require("../middlewares/authMiddleware");
const logger = require("../logger/logger")

// add a book
router.post("/add-book", authMiddleware, async (req, res) => {
  try {
    console.log(req);
    const newBook = new Book(req.body);
    await newBook.save();
    logger.info("Book added successfully " + req.body.book);
    return res.send({ success: true, message: "Book added successfully" });
  } catch (error) {
    logger.info("Book added failed");
    return res.send({ success: false, message: error.message });
  }
});

// update a book
router.put("/update-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    logger.info("Book updated successfully " + req.body.book);
    return res.send({ success: true, message: "Book updated successfully" });
  } catch (error) {
    logger.info("Book update failed");
    return res.send({ success: false, message: error.message });
  }
});

// delete a book
router.delete("/delete-book/:id", authMiddleware, async (req, res) => {
  console.log(req.params.id)
  try {
    await Book.findByIdAndDelete(req.params.id);
    logger.info("Book delete success");
    return res.send({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    logger.info("Book delete failed");
    return res.send({ success: false, message: error.message });
  }
});

// get all books
router.get("/get-all-books", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    logger.info("get all books, success");
    return res.send({ success: true, data: books });
  } catch (error) {
    logger.info("get all books, failed");
    return res.send({ success: false, message: error.message });
  }
});
// get a book by id
router.get("/get-book-by-id/:id", authMiddleware, async (req, res) => {
  try {
    console.log(req.params.id)
    const book = await Book.findById(req.params.id);
    logger.info("get book by id, success" + book.title);
    return res.send({ success: true, data: book });
  } catch (error) {
    logger.info("get book by id, failed");
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
