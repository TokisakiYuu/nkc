const Router = require('koa-router');
const router = new Router();
const {accessSync} = require('fs');
const path = require('path');

router
  .get('/', async (ctx, next) => {
    ctx.throw(501, 'a uid is required.');
    await next()
  })
  .get('/:uid', async (ctx, next) => {
    const {uid} = ctx.params;
    try {
      const url = String(path.resolve(__dirname, `../../resources/avatar/${uid}.jpg`));
      accessSync(url);
      ctx.filePath = url;
    } catch(e) {
      console.error(e);
      ctx.filePath = path.resolve(__dirname, '../../resources/default_things/default_avatar_small.gif')
    }
    console.log(ctx.filePath);
    await next()
  });

module.exports = router;