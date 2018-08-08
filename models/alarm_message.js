const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlarmMessage = new Schema({
    no: Number,
    source: Number,
    level: Number,
    created_at: Number,
    updated_at: Number,
    status: Number,
    notice: String,
});
const model = mongoose.model('alarm_message', AlarmMessage);
AlarmMessage.pre('save', function (next) {
    if(!this.created_at) {
        this.created_at = (new Date()).valueOf();
    }
    this.updated_at = (new Date()).valueOf();
    next()
});
module.exports = model;