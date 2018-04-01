const mongoose = require('mongoose');
const Goods = require('./goods');
const config =  require('../config/config.local');

mongoose.connect(config.mongodb.db, {
	server: {poolSize: 20}
}, function (error) {
	if (error) {
		console.log(error);
	    // logger.error('connect to %s error: ', config.db, err.message);
	    process.exit(1);
	}
}),

module.exports.GoodsModel =  mongoose.model('goods', Goods);
