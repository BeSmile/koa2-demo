const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const config = require('./config/config.local.js');
const Router = require('koa-router');
app.use(bodyParser());
require('./models');

const alarm_router = require('./routes/alarm_router');
const router = new Router();
// router.use('/ts', childs.routes(), childs.allowedMethods());
router.use('/alarm', alarm_router.routes(), alarm_router.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.listen(config.app.port, () => {
	console.log(`this server has listen by ${config.app.port}`);
});
