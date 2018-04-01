const Koa = require('koa');
const app = new Koa();
const config = require('./config/config.local.js');
const Router = require('koa-router');

const router = new Router();

const childs = new Router();

require('./models');
childs.get('/child', (ctx, next) => {
	ctx.body = 'child'
});
childs.get('/', (ctx, next) => {
	ctx.body = 'child home';
})

router.get('/', (ctx, next) => {
	ctx.body = 'Hello World!';
	ctx.user = 'dd';
	console.log("this router is :" + ctx._matchedRoute);
	next();
}, ctx => {
	console.log(ctx.user);
})
router.use('/ts', childs.routes(), childs.allowedMethods());
app.use(router.routes()).use(router.allowedMethods())
app.listen(config.app.port);
