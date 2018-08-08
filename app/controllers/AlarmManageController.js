const mongoose = require('mongoose');
const bodyparser = require('../../utils/bodyparser');
const AlarmMessageModel = mongoose.model('alarm_message');

class AlarmManageController {
    static async getAlaramList(ctx,next) {
        await next();
        let messages;
        let count;
        await AlarmMessageModel.find({}, function(err, results) {
            messages = results;
        });
       ;
        await AlarmMessageModel.find().estimatedDocumentCount({}, function(err, c) {
            count = c;
        });
        ctx.body = (bodyparser("0", 'success', {
            rows: messages,
            total:  count,
        }));
    }
    static async addAlarm(ctx,next) {
        const alarm = new AlarmMessageModel({
            source: Math.floor(Math.random() * 5),
            level: Math.floor(Math.random() * 3),
            datetime: 1533707251356,
            status: Math.floor(Math.random() * 3),
            notice: 'email',
        }, false);
        console.log(alarm);
        alarm.save(function (error) {
            console.log(error);
            process.exit(-1)
        });
        ctx.body = (bodyparser(200, '添加成功'));
        await next();
    }
}
module.exports = AlarmManageController;