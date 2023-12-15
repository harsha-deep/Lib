const router = require("express").Router();
const Issue = require("../models/issuesModel");
const Book = require("../models/booksModel");
const UserModel = require("../models/usersModel");
const authMiddleware = require("../middlewares/authMiddleware");
const logger = require("../logger/logger")
// issue a book to patron
router.post("/issue-new-book", authMiddleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be decremented by 1)
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: -1 } }
    );

    const newIssue = new Issue(req.body);
    await newIssue.save();
    logger.info("Book issued successfully " + req.body.book)
    return res.send({
      success: true,
      message: "Book issued successfully",
      data: newIssue,
    });
  } catch (error) {
    logger.info("Book issued failed" + req.body.book)
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// get issues
router.post("/get-issues", authMiddleware, async (req, res) => {
  try {
    delete req.body.userIdFromToken;
    const issues = await Issue.find(req.body).populate("book").populate("user").sort({ issueDate: -1 });
    logger.info("Get all issues, success")
    return res.send({
      success: true,
      message: "Issues fetched successfully",
      data: issues,
    });
  } catch (error) {
    logger.info("Get all issues, failed")
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// return a book
router.post("/return-book", authMiddleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be incremented by 1)
    await Book.findOneAndUpdate(
      {
        _id: req.body.book,
      },
      {
        $inc: { availableCopies: 1 },
      }
    );

    // return book (update issue record)
    await Issue.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );
    logger.info("Book returned, success " + req.body.book)
    return res.send({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    logger.info("Book returned, failed " + req.body.book)
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete an issue
router.post("/delete-issue", authMiddleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be incremented by 1)
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: 1 } }
    );

    // delete issue
    await Issue.findOneAndDelete({ _id: req.body._id });
    logger.info("delete issue, success " + req.body.book)
    res.send({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    logger.info("delete issue, failed " + req.body.book)
    res.send({ success: false, message: error.message });
  }
});

// edit an issue
router.post("/edit-issue", authMiddleware, async (req, res) => {
  try {
    await Issue.findOneAndUpdate({
      _id: req.body._id,
    }, req.body);
    logger.info("edit issue, success " + req.body.book)
    res.send({ success: true, message: "Issue updated successfully" });
  } catch (error) {
    logger.info("edit issue, failed " + req.body.book)
    res.send({ success: false, message: error.message });
  }
});

router.post("/get-user-id-by-email", authMiddleware, async (req, res) => {
  try {
    const email = req.body.email;

    const user = await UserModel.findOne({ email });

    if (user) {
      logger.info("Get id using email " + req.body.email);
      res.send({ success: true, userId: user._id, role: user.role });
    } else {
      logger.info("Get id using email + User not found" + req.body.email);
      res.send({ success: false, message: "User not found" });
    }
  } catch (error) {
    logger.info("Get id using email, Failed " + req.body.email);
    res.send({ success: false, message: error.message });
  }
});
module.exports = router;
