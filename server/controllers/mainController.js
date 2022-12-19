const mainList = require("../model/mainModel");

module.exports.main = async (req, res, next) => {
  try {
    const { title, contentBody, writer, time, user } = req.body;
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
