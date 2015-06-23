var argv = require('minimist')(process.argv.slice(2));
var SocketCluster = require('socketcluster').SocketCluster;

var socketCluster = new SocketCluster({
  workers: Number(argv.w) || 1,
  stores: Number(argv.s) || 1,
  storeOptions: {
  	host: '127.0.0.1',
  	port: 6379
  },
  port: Number(argv.p) || 8000,
  appName: argv.n || null,
  workerController: __dirname + '/worker.js',
  storeController: __dirname + '/store.js',
  socketChannelLimit: 100,
  rebootWorkerOnCrash: false
});

module.exports = socketCluster