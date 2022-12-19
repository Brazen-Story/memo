const { register, login } = require("../controllers/usersController");
const { write, mymemo, del } = require("../controllers/memosController");
const { main } = require("../controllers/mainController");
//const { main, mymemos } = require("../controllers/mainController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/write", write);
router.post("/user/:email", mymemo);
router.post("/", main);
router.post("/del", del);
//router.post("/", mymemos);

module.exports = router;
