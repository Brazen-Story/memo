const memoList = require("../model/memoModel");
const mainList = require("../model/mainModel");

module.exports.write = async (req, res, next) => {
  try {
    let { title, content, writer, time } = req.body; //const는 값이 바뀌지않음. 그래서 let으로
    console.log("저장 발동");

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

module.exports.myDeleteRoute = async (req, res, next) => { // 아이디 받아서 삭제 성공
  try {
      const id = req.params.id;
      await memoList.findByIdAndRemove(id).exec();
      return res.json({ status: true });
  } catch (ex) {
    next(ex);
  }
};