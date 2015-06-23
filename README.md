SC-Redis-Outbound
======

[![Travis](https://img.shields.io/travis/webcast-io/sc-redis-outbound.svg?style=flat-square)](https://travis-ci.org/webcast-io/sc-redis-outbound)

This is a Redis adaptor for SocketCluster: http://socketcluster.io/
It allows you to interact with SocketCluster channels via Redis.
This adapter is unidirectional only allowing publishing from Redis to SocketCluster Clients. Any publishes from SocketCluster clients should be ignored.
Also assumes anything published to Redis is in JSON format.


## Install

```bash
npm install sc-redis-outbound
```

## Usage

Put the following code inside the SocketCluster sample app - Inside **store.js**:

```js
var scRedis = require('sc-redis-outbound');

module.exports.run = function (store) {
  console.log('   >> Store PID:', process.pid);
  scRedis.attach(store);
};
```

You will need to provide some storeOptions to SocketCluster (in **server.js**) - These will automatically be added as an options property on your store object.
Example (substitute with relevant values):

```js
var socketCluster = new SocketCluster({
  // ...
  storeOptions: {
    host: '127.0.0.1',
    port: 6379
  }
});
```

Note that SC-Redis uses the Node Redis client to hook into a Redis server.
Any option described here: https://github.com/mranney/node_redis#overloading can be provided as a store option - In production you may want to provide the 'password' property.

Feel free to modify server.js to get some of these options from the command line if appropriate (instead of having them hard-coded inside server.js).

To test, you need to launch your Redis server (on the host and port you specified in storeOptions).
Then you need to launch your SC server using (make sure your Redis server is running before you launch your SC instance):

```bash
node server
```

Open your browser window and connect to your SC server... By default it's at: http://localhost:8000/ - Then open the developer console.
Note that your client will subscribe to a 'pong' channel on SocketCluster. SC-Redis will automatically handle all the synchronization work.

On the host on which your Redis server is running, you can interact with it using:

```bash
redis-cli
```

Then inside the Redis prompt, you can enter:

```bash
publish pong '{"a":123, "b":456}'
```

You should see the object appear in your browser's developer console (from SocketCluster).


 
## License

(The MIT License)

Copyright (c) 2013-2015 TopCloud

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
