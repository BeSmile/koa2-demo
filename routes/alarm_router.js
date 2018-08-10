const router = require('koa-router')();
const alarm_controller = require('../app/controllers/AlarmManageController');

router.get('/list', alarm_controller.getAlaramList);
router.post('/', alarm_controller.addAlarm);
router.get('/message/:id', alarm_controller.getAlaram);
router.post('/message/remove', alarm_controller.removeAlarams);
router.post('/message/batch', alarm_controller.updateAlaram);
module.exports = router;