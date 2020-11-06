const fs = require("fs").promises;

const router = require("koa-router")();
router
  // 购买附件
  .post("/", async (ctx, next) => {
    const {data, db, params} = ctx;
    const {rid} = params;
    const {user} = data;
    const resource = await db.ResourceModel.findOne({rid, type: "resource"});
    let filePath = await resource.getFilePath();
    try {
      await fs.access(filePath);
    } catch (e) {
      console.log(e);
      ctx.throw(404, '资源不见了 :(')
    }

    const freeTime = 24 * 60 * 60 * 1000;
    const {needScore, reason} = await resource.checkDownloadCost(user, freeTime);
    if(needScore) {
      // 这里必须在data里指定rid，下面的 insertSystemRecord 函数要读
      data.rid = resource.rid;
      // 扣除积分
      await db.KcbsRecordModel.insertSystemRecord("attachmentDownload", user, ctx);
    }
    return next();
  })
module.exports = router;