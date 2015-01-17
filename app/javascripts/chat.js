(function() {
  window.Chattin = window.Chattin || {};

  var Chat = Chattin.Chat = function(socket, attribute) {
    this.socket = socket;
    this.attribute = attribute;
  };

  Chat.prototype.sendMessage = function (msg) {
    this.socket.emit("receiveMessage", {text: msg});
  };

  Chat.prototype.changeNickname = function (nickname) {
    this.socket.emit("nicknameChangeRequest", {nickname: nickname})
  };

  Chat.prototype.processInput = function (msg) {
    if(msg[0] === "/") {
      var input = msg.split(' ')
      var command = input[0];
      var arg = input.slice(1).join();
      this.processCommand(command, arg);
    } else {
      this.sendMessage(msg);
    }
  };

  Chat.prototype.processCommand = function (command, arg) {
    if(command === "/nick") {
      this.changeNickname(arg);
    }
  };
})();