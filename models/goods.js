const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goods = new Schema({
	id: {type: Number, default: 0},
	money: Number,
	num: Number,
	title: String,
});

module.exports = mongoose.model('goods', Goods);