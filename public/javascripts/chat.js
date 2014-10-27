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

  Chat.prototype.postMessage = function(data) {
    $("ul").prepend("<li>" + data.nickname + ": " + data.text + "</li>");
  }
})();