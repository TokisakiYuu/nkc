const Router = require('koa-router');
const scoreRouter = new Router();
scoreRouter
	.get('/', async (ctx, next) => {
		ctx.template = 'experimental/settings/score.pug';
		const {data, db, query} = ctx;
		const {type} = query;
		data.type = type;
		data.scoreSettings = await db.SettingModel.findOnly({type: 'score'});
		data.scoreOperations = [];
		for(const _id of data.scoreSettings.operationsId) {
			const operation = await db.OperationModel.findOne({_id});
			if(operation) {
				data.scoreOperations.push(operation);
			}
		}
		data.operations = await db.OperationModel.find({_id: {$nin: data.scoreSettings.operationsId}}).sort({toc: 1});
		if(type) {
			data.operation = await db.OperationModel.findOnly({_id: type});
		} else {
			data.operation = data.scoreOperations[0] || data.operations[0];
			data.type = data.operation._id;
		}
		await next();
	})
	.patch('/', async (ctx, next) => {
		const {db, body} = ctx;
		const scoreSettings = await db.SettingModel.findOnly({type: 'score'});
		if(body.operation === 'modifyFormula') {
			const {formula} = body;
			await scoreSettings.update({formula});
		} else {
			const {_id, kcb, xsf, score} = body;
			const operation = await db.OperationModel.findOnly({_id});
			if(kcb.status && kcb.count <= 0 && kcb.count !== -1) ctx.throw(400, '科创币每天次数设置错误');
			if(xsf.status && xsf.count <= 0 && xsf.count !== -1) ctx.throw(400, '学术分每天次数设置错误');
			if(score.status && score.count <= 0 && score.count !== -1) ctx.throw(400, '积分每天次数设置错误');
			await operation.update({kcb, xsf, score});
			if(kcb.status || xsf.status || score.status) {
				await scoreSettings.update({$addToSet: {operationsId: operation._id}});
			} else {
				await scoreSettings.update({$pull: {operationsId: operation._id}});
			}
		}
		await next();
	});
module.exports = scoreRouter;