var createChat = function(server) {
  var io = require('socket.io')(server);
  var nicknames = {};
  guestsCount = 0;

  io.on('connection', function (socket) {

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

    io.emit("addUser", {
      nickname: nicknames.socketId
    });

    socket.on('receiveMessage', function (data) {
      io.emit('sendMessage', {
        contents: data.text,
        author: nicknames.socketId,
        time: Date.now()
      });
    });

    socket.on("nicknameChangeRequest", function(data) {
      // data should contain the name?
      var oldNickname = nicknames.socketId;
      var nickname = data.nickname;
      var socketId = socket.id;
      if(nicknameValid(nickname)) {
        nicknames.socketId = nickname;
        socket.emit("nicknameChanged", {
          success: true,
          nickname: nickname
        });

        io.emit("newNickname", {
          oldNickname: oldNickname,
          newNickname: nickname
        });
      } else {
        server.emit("nicknameChanged", {
          success: false,
          nickname: oldNickname
        });
      }
    });

    socket.on("close", function() {
      var socketId = socket.id;
      nicknames.socketId = null;
    });

  });


};

exports.createChat = createChat;