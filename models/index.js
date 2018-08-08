const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const config =  require('../config/config.local');

//建立连接
const connection = mongoose.connect(config.mongodb.db, config.mongodb.config, (error) => {
    if(error) {
        process.exit(1);
    }
});
require('./alarm_message');
// mongoose.model('alarm_message', AlarmMessageSchema);//注册schema




