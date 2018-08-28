const mongoose = require('mongoose');
const bodyparser = require('../../utils/bodyparser');
const AlarmRuleModel = mongoose.model('alarm_rule');
const ObjectId = mongoose.Types.ObjectId;

class AlarmManageController {
    static async updateAlaram(ctx, next) {
        const sid = ctx.request.body.id;
        if(!sid) {
            ctx.body = (bodyparser("0", '不能为空'));
            return;
        }
        const ids = sid.split(',').map(item => {
            return mongoose.Types.ObjectId(item);
        });
        const content =  ctx.request.body.content || '';
        try {
            let params = { content, status: 2 }
            if(ids.length === 1) {
                params = {
                    ...params,
                    status: ctx.request.body.status || 0,
                }
            }
            await new Promise((resolve, reject) => {
                AlarmRuleModel.updateMany({_id: { $in: ids }}, { $set: params }, {} , function(err) {
                    if(err) reject(err);
                    resolve();
                });
            });
        } catch (e) {
            ctx.body = (bodyparser("0", '保存失败'));
        }
        ctx.body = (bodyparser("0", '保存成功'));
    }
    static async removeAlarams(ctx, next) {
        const sid =  ctx.request.body.id || '';
        const ids = sid.split(',').map(item => {
            return new mongoose.Types.ObjectId(item);
        });
        await new Promise((resolve, reject) => {
            AlarmRuleModel.remove({_id:{$in:ids}}, function(err) {
                if(err) reject();
                resolve();
            });
        });
        ctx.body = (bodyparser("0", '删除成功'));
        await next();
    }
    static async getRule(ctx, next) {
        const id =  ctx.params.id || null;
        let res = {};
        if(id) {
            const query  = AlarmRuleModel.where({ _id: id });

            try {
                await new Promise((resolve, reject) => {
                    query.findOne(function (err, message) {
                        if (err)  {
                            reject();
                            return;
                        };
                        res = message;

                        res['remark'] = [{
                            time: (new Date()).valueOf(),
                            text: '通过某种方式解决了这种很奇怪的问题',
                        }, {
                            time: (new Date()).valueOf(),
                            text: '已解决很ok',
                        }, {
                            time: (new Date()).valueOf(),
                            text: '该问题得到了决绝',
                        }];

                        res['operator'] = message.message;
                        resolve();
                    });
                });
            } catch (e) {
                ctx.body = (bodyparser("0", 'error'));
            }
            ctx.body = (bodyparser("0", 'success', res));
        }

    }
    static async getRuleList(ctx,next) {
        let messages;
        let count;
        let params = {};

        const status =  ctx.query.status || null;
        const level = ctx.query.level || null;
        const startTime =  ctx.query.startTime || null;
        const endTime =  ctx.query.endTime || null;
        if(status)
            params['status'] = status;
        if(level)
            params['level'] = level;
        if(startTime && endTime)
            params['created_at'] = {
                "$gte": startTime,
                "$lte":endTime
            };
        await new Promise((resolve, rejcet) => {
            AlarmRuleModel.find(params, function(err, results) {
                if(err) {
                    process.exit(-1);
                }
                messages = results || [];
                count = results.length;
                resolve();
                return;
            });
        });
        ctx.body = (bodyparser("0", 'success', {
            rows: messages,
            total:  count,
        }));
        await next();
    }
    static async addRule(ctx,next) {
        const alarm = new AlarmRuleModel({
            source: Math.floor(Math.random() * 5),
            message: `超过阈值${Math.random() * 100}`,
            level: Math.floor(Math.random() * 3),
            way: Math.floor(Math.random() * 2),
            datetime: 1533707251356,
            status: Math.floor(Math.random() * 2),
            notice: 'email',
        }, false);
        alarm.save(function (error) {
            if(error) {
                process.exit(-1)
            }
        });
        ctx.body = (bodyparser(200, '添加成功'));
    }
}
module.exports = AlarmManageController;