const router = require('koa-router')();
const alarm_controller = require('../app/controllers/AlarmManageController');
const rule_controller = require('../app/controllers/AlarmRuleController');
const notice_controller = require('../app/controllers/AlarmNoticeController');
router.get('/list', alarm_controller.getAlaramList);
router.post('/', alarm_controller.addAlarm);
router.get('/message/:id', alarm_controller.getAlaram);
router.post('/message/remove', alarm_controller.removeAlarams);
router.post('/message/batch', alarm_controller.updateAlaram);

router.get('/rule/list', rule_controller.getRuleList);
router.post('/rule', rule_controller.addRule);

router.get('/notice/list', notice_controller.getNoticeList);
router.post('/notice', notice_controller.addNotice);

module.exports = router;