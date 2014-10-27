var somefunction = function(server) {
  var io = require('socket.io')(server);
  guestsCount = 0;

  io.on('connection', function (socket) {

    var nicknames = {};
    var nicknameValid = function(nickname) {
      if (nickname.slice(0, 5) === "guest") {
        return false;
      }

      for(var key in nicknames) {
        if(nicknames[key] === nickname) {
          return false;
        }
      }
      return true;

    }

    guestsCount += 1;
    var socketId = socket.id;
    nicknames.socketId = "guest" + guestsCount;
    socket.emit("nicknameChanged", {
      success: true,
      nickname: nicknames.socketId
    });

    socket.on('receiveMessage', function (data) {
      io.emit('sendMessage', {text: data.text, nickname: nicknames.socketId});
    });

    socket.on("nicknameChangeRequest", function(data) {
      // data should contain the name?
      var nickname = data.nickname;
      var socketId = socket.id;
      if(nicknameValid(nickname)) {
        nicknames.socketId = nickname;
        socket.emit("nicknameChanged", {
          success: true,
          nickname: nickname
        });
      } else {
        server.emit("nicknameChanged", {
          success: false,
          nickname: nicknames.socketId
        });
      }
    });

  });

};

exports.somefunction = somefunction;