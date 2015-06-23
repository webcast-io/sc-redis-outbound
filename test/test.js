var socketCluster = require('socketcluster-client')
var redis;
var socketServer;
var assert = require('assert')

before(function (done) {
  socketServer = require('./sc2/server')
  setTimeout(done, 1200)
})

describe('sc2', function () {
  var socket = null

  describe('connection', function () {

    it('accepts connections from socketcluster-client', function (done) {

      var options = {
        hostname: '127.0.0.1',
        port: 8000
      };

      // Initiate the connection to the server
      socket = socketCluster.connect(options);
      socket.on('connect', function () {
        done()
      });
    })

  })

  describe('receving messages', function () {
    var writer = null

    before(function (done) {
      redis = require('redis').createClient()
      redis.on('ready', done)
    })
    after(function (done) {
      socketServer.killWorkers()
      socketServer.killStores()
      done()
    })

    it('should receive events published to redis', function (done) {

      var thischannel = socket.subscribe('this-is-channel')

      thischannel.watch(function (data) {
        assert.equal(data, '23425')
        done()
      })

      setTimeout(function () {
        redis.publish('this-is-channel', '23425', function (err) {
          if (err) {
            return done(err)
          }
        });
      }, 400)


    })

  })

})