const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlarmRule = new Schema({
    no: Number,
    source: Number,
    level: Number,
    created_at: Number,
    updated_at: Number,
    status: Number,
    message: String,
    way: Number,
});
const model = mongoose.model('alarm_rule', AlarmRule);
AlarmRule.pre('save', function (next) {
    if(!this.created_at) {
        this.created_at = (new Date()).valueOf();
    }
    this.updated_at = (new Date()).valueOf();
    next()
});
module.exports = model;