var somefunction = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.on('receiveMessage', function (data) {
      io.emit('sendMessage', data);
    });
  });
};

exports.somefunction = somefunction;