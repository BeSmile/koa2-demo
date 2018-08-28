const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlarmNotice = new Schema({
    no: Number,
    source: Number,
    level: Number,
    created_at: Number,
    updated_at: Number,
    status: Number,
    message: String,
    way: Number,
    email: String,
    name: String,
});
const model = mongoose.model('alarm_notice', AlarmNotice);
AlarmNotice.pre('save', function (next) {
    if(!this.created_at) {
        this.created_at = (new Date()).valueOf();
    }
    this.updated_at = (new Date()).valueOf();
    next()
});
module.exports = model;