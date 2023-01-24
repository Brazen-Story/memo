const { register, login } = require("../controllers/usersController");
const { write, mymemo, del, myDeleteRoute } = require("../controllers/memosController");
const { main, mainDeleteRoute, mainUpdateRoute } = require("../controllers/mainController");
//const { main, mymemos } = require("../controllers/mainController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/write", write);
router.post("/user/:email", mymemo);
router.post("/:date", main);//sd
//router.post("/", mymemos);
router.delete("/mainDeleteRoute/:id", mainDeleteRoute);
router.delete("/myDeleteRoute/:id", myDeleteRoute);
router.put("/mainUpdateRoute", mainUpdateRoute);
module.exports = router;
