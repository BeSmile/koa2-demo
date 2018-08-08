const router = require('koa-router')();
const alarm_controller = require('../app/controllers/AlarmManageController');

router.get('/list', alarm_controller.getAlaramList);
router.post('/', alarm_controller.addAlarm);

module.exports = router;