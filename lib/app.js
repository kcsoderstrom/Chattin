var http = require('http'),
  static = require('node-static');

var file = new static.Server('./public');

var server = http.createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
});

server.listen(8000);

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.emit('message', { text: data });
  });
});