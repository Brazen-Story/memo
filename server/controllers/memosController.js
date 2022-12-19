const memoList = require("../model/memoModel");
const mainList = require("../model/mainModel");

module.exports.write = async (req, res, next) => {
  try {
    const { title, content, writer, time } = req.body;
    // const titlenameCheck = await memoList.findOne({ title });
    // if (titlenameCheck)
    //   return res.json({ msg: "같은 파일명이 있습니다.", status: false });
    const memo = await memoList.create({
      title,
      writer,
      content,
      time,
    });
    return res.json({ status: true, memo });
  } catch (ex) {
    console.log("write", ex);
    next(ex);
  }
}; //mainlist memolist

module.exports.mymemo = async (req, res, next) => {
  try {
    const { title, content, writer, time } = req.body;
    const contentBody = await memoList.find({});
    if (title && content && writer && time) {
      const main = await mainList.create({
        title,
        writer,
        content,
        time,
      });
      return res.json({ status: true, main, content: contentBody });
    } else {
      return res.json({ content: contentBody });
    }
  } catch (ex) {
    console.log("mymemo", ex);
    next(ex);
  }
};

module.exports.del = async (req, res, next) => {
  try {
    const { title, content, writer, time, user } = req.body;
    if (writer === user) {
      console.log(writer === user);
      const main = await memoList.deleteMany({
        title,
        writer,
        content,
        time,
      });
      return res.json({ status: true, content });
    }
  } catch (ex) {
    console.log("del", ex);
    next(ex);
  }
};
