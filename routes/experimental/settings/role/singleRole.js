const Router = require('koa-router');
const router = new Router();
router
  .use('/', async (ctx, next) => {
    const {data, db, params} = ctx;
    const {_id} = params;
    data.role = await db.RoleModel.findOnly({_id});
    await next();
  })
  .get('/', async (ctx, next) => {
    const {data, db} = ctx;
    ctx.template = 'experimental/settings/role/singleRole.pug';
    const defaultRole = await db.RoleModel.findOnly({_id: "default"});
    data.defaultOperationsId = defaultRole.operationsId;
    data.operationTypes = await db.OperationTypeModel.find().sort({toc: 1});
    const operations = await db.OperationModel.find();
    data.operations = await Promise.all(operations.map(async o => {
      const operation = o.toObject();
      operation.name = ctx.state.lang('operations', operation._id);
      return operation;
    }));
    const {role} = data;
    let q = {};
    if(role._id === 'default') {
      q = {};
    } else if(role._id === 'scholar') {
      q = {xsf: {$gte: 1}};
    } else {
      q.certs = role._id;
    }
    data.users = await db.UserModel.find(q).sort({toc: -1}).limit(10);
    await next();
  })
  .put('/', async (ctx, next) => {
    const {tools, body, data, db, redis} = ctx;
    const {contentLength} = tools.checkString;
    const {role} = body;
    const roleDB = data.role;
    let {
      displayName,
      description,
      color,
      hasIcon,
      operationsId,
      type,
      modifyPostTimeLimit,
      hidden
    } = role;
    if(!displayName) ctx.throw(400, '证书名称不能为空');
    if(contentLength(displayName) > 10) ctx.throw(400, '证书名称不能超过20字节');
    if(!description) ctx.throw(400, '证书简介不能为空');
    if(contentLength(description) > 100) ctx.throw(400, '证书简介不能超过200字节');
    if(!['common', 'management', 'system'].includes(type)) ctx.throw(400, '请选择证书类型');
    if(roleDB.type === 'system' && type !== 'system') ctx.throw(400, '系统类证书无法更改证书类型');
    if(!color) ctx.throw(400, '颜色不能为空');
    if(!color.includes('#')) ctx.throw(400, '颜色值只支持16进制');
    if(modifyPostTimeLimit !== -1 && modifyPostTimeLimit < 0) ctx.throw(400, '更改POST的时间只能为-1或大于等于0');
    const updateObj = {
      hasIcon,
      displayName,
      description,
      color,
      modifyPostTimeLimit,
      type,
      hidden: !!hidden
    };
    if(role._id !== 'dev') {
      const operations = await db.OperationModel.find({_id: {$in: operationsId}});
      updateObj.operationsId = operations.map(o => o._id);
    }
    await roleDB.update(updateObj);
    await db.RoleModel.saveRolesToRedis();
    await next();
  })
  .post('/icon', async (ctx, next) => {
    const {fs, fsPromise, body, data, db, settings} = ctx;
    const {defaultRoleIconPath} = settings.statics;
    const {role} = data;
    const {file} = body.files;
    await fsPromise.copyFile(file.path, defaultRoleIconPath + '/' + role._id + '.png');
    await role.update({hasIcon: true});
    await db.RoleModel.saveRolesToRedis();
    await next();
  })
  .del('/', async (ctx, next) => {
		const {params, db, redis} = ctx;
		const {_id} = params;
		const role = await db.RoleModel.findOnly({_id});
		if(role.type === 'system') ctx.throw(400, '无法删除系统类证书');
    await db.UserModel.updateMany({certs: _id}, {$pull: {certs: _id}});
    await db.ForumModel.updateMany({rolesId: _id}, {$pull: {rolesId: _id}});
		await role.remove();
    await db.RoleModel.saveRolesToRedis();
		await next();
  });
module.exports = router;
