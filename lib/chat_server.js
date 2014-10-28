var createChat = function(server) {
  var io = require('socket.io')(server);
  var nicknames = {};
  var namesOnly = function() {
    var namesOnly = [];
    for(var key in nicknames) {
      namesOnly.push(nicknames[key]);
    }
    return namesOnly;
  }


  var guestsCount = 0;

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

  // THE MEAT

  io.on('connection', function (socket) {

    guestsCount += 1;
    var socketId = socket.id;

    if(!nicknames[socket.id]) {
      nicknames[socket.id] = "guest" + guestsCount;
      socket.emit("nicknameChanged", {
        success: true,
        nickname: nicknames[socket.id]
      });
    }

    var updateUsers = function() {
      io.emit("updateUsers", {
        users: namesOnly()
      });
    }

    updateUsers();

    socket.on('receiveMessage', function (data) {
      var time = new Date();
      var hours = time.getHours() % 12;
      var minutes = time.getMinutes();
      if(minutes < 10) {
        minutes = "0" + minutes;
      }
      io.emit('sendMessage', {
        contents: data.text,
        author: nicknames[socket.id],
        time: hours + ":" + minutes
      });
    });

    socket.on("nicknameChangeRequest", function(data) {
      // data should contain the name?
      var oldNickname = nicknames[socket.id];
      var nickname = data.nickname;
      if(nicknameValid(nickname)) {
        nicknames[socket.id] = nickname;
        socket.emit("nicknameChanged", {
          success: true,
          nickname: nickname
        });

        io.emit("newNickname", {
          oldNickname: oldNickname,
          newNickname: nickname
        });

        updateUsers();
      } else {
        server.emit("nicknameChanged", {
          success: false,
          nickname: oldNickname
        });
      }
    });

    socket.on("disconnect", function() {
      delete nicknames[socket.id];
      updateUsers();
    });

  });


};

exports.createChat = createChat;