const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
const User = require("./model/userModel");
const Memo = require("./model/memoModel");

var MongoClient = require("mongodb").MongoClient;
const bodyparser = require("body-parser");

require("dotenv").config();
app.use(bodyparser.urlencoded({ extends: true }));
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Succesful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});

// MongoClient.connect(process.env.MONGO_URL, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("test");
//   dbo
//     .collection("users")
//     .find({}, { projection: { _id: 0, username: 1 } })
//     .toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
// });

// MongoClient.connect(process.env.MONGO_URL, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("test");
//   dbo
//     .collection("memos")
//     .find(a)
//     .toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
// });

// app.post("/write", (req, res) => {
//   const memo = new Memo(req.body);
//   // 정보 저장, 에러 시 json 형식으로 전달
//   memo.save((err, memoinfo) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({
//       success: true,
//     });
//   });
// });
