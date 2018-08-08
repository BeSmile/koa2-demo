module.exports = {
	app: {
		port: 8888
	},
	redis: {
		
	},
	mongodb: {
		db: 'mongodb://127.0.0.1/store',
		config: {
            server: {poolSize: 20},
		}
	}
};