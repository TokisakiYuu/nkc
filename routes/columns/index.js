const Router = require("koa-router");
const router = new Router();
const columnRouter = require("./column");

router
  .get("/", async (ctx, next) => {
    const {query, data, db} = ctx;
    const {page = 0} = query;
    let {t} = query;
    const match = {};
    const columnSettings = await db.SettingModel.getSettings('column');
    if(!ctx.permission('column_single_disabled')) {
      match.closed = false;
      match.disabled = false;
    }
    const fidOfCanGetThread = await db.ForumModel.getReadableForumsIdByUid(data.user? data.user.uid: '');
    data.permissionPushColumnToHome = ctx.permission('pushColumnToHome');
    match.postCount = {$gte: columnSettings.columnHomePostCountMin};
    const count = await db.ColumnModel.countDocuments(match);
    const paging = ctx.nkcModules.apiFunction.paging(page, count);
    const sort = {};
    if(t === undefined) {
      if(columnSettings.columnHomeSort === 'updateTime') {
        t = 'l';
      } else {
        t = 's';
      }
    }
    if(t === 'l') {
      sort.tlm = -1;
    } else if(t === 's'){
      sort.subCount = -1;
    } else {
      sort.postCount = -1;
    }
    const homeSettings = await db.SettingModel.getSettings('home');
    data.columns = await db.ColumnModel.find(match, {_v: 0})
      .sort(sort)
      .skip(paging.start)
      .limit(paging.perpage);
    const threadsId = [];
    for(const column of data.columns) {
      column.homeTopped = homeSettings.columnsId.includes(column._id);
      column.latestThreads = await db.ColumnPostModel.getLatestThreads(column._id, 3, fidOfCanGetThread);
    }
    data.columns.map(column => {
      column.homeTopped = homeSettings.columnsId.includes(column._id);
      return column;
    });
    ctx.template = 'columns/columns.pug';
    data.t = t;
    data.paging = paging;
    await next();
  })
  .use("/:_id", columnRouter.routes(), columnRouter.allowedMethods());
module.exports = router;
