var redis = require('redis');

module.exports.attach = function (store) {
  var options = store.options;
  var instanceId = store.instanceId;
  
  var subClient = redis.createClient(options.port, options.host, options);
  
  store.on('subscribe', subClient.subscribe.bind(subClient));
  store.on('unsubscribe', subClient.unsubscribe.bind(subClient));

  
  var instanceIdRegex = /^[^\/]*\//;
  
  subClient.on('message', function (channel, message) {
    var sender = null;
    var data = JSON.parse(message)
    store.publish(channel, data);
  });
};