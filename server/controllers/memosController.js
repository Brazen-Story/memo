const memoList = require("../model/memoModel");
const mainList = require("../model/mainModel");

module.exports.write = async (req, res, next) => {
  try {
    let { title, content, writer, time } = req.body; //const는 값이 바뀌지않음. 그래서 let으로
    console.log("저장 발동");

    // 제목 중복 1 붙여주기
    //let i = 0;
    // const titlenameCheck = await memoList.findOne({ title });
    // if (titlenameCheck){
    //   i = i + 1;
    //   title = title + " (" + i + ")";
    // }

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
    const { _id, title, content, writer, time } = req.body;
    const contentBody = await memoList.find({});
    console.log(req.body);
    if (_id && title && content && writer && time) {
      const main = await mainList.create({
        _id,
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
      //console.log(writer === user);//true
      console.log("개인 삭제 발동")
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
