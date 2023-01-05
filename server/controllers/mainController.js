const mainList = require("../model/mainModel");

module.exports.main = async (req, res, next) => {
  try {
    const { title, contentBody, writer, time, user } = req.body;
    console.log(req.body);
    const content = await mainList.find({});
    if (writer === user) {
      if (title && content && writer && time) {
        const main = await mainList.deleteMany({
          title,
          writer,
          contentBody,
          time,
        });
        return res.json({ status: true, content });
      }
    }
    return res.json({ content });
  } catch (ex) {
    next(ex);
  }
};

module.exports.mainDeleteRoute = async (req, res, next) => { // 아이디 받아서 삭제 성공
  try {
      const id = req.params.id;
      await mainList.findByIdAndRemove(id).exec();
      return res.json({ status: true });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.main = async (req, res, next) => {
//   try {
//     const { title, contentBody, writer, time, user } = req.body;
//     console.log("으억")
//     const content = await mainList.find({});
//     return res.json({ content });
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.delmain = async (req, res, next) => {
//   try {
//     const { title, content, writer, time, user } = req.body;
//     if (writer === user) {
//       //console.log(writer === user);//true
//       console.log("개인 삭제 발동")
//       const main = await memoList.deleteMany({
//         title,
//         writer,
//         content,
//         time,
//       });
//       console.log("hi")
//       return res.json({ status: true, content });
//     }
//   } catch (ex) {
//     console.log("del", ex);
//     next(ex);
//   }
// };

