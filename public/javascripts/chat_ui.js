(function() {

  var ChatUi = window.ChatUi = function() {
    this.socket = io();
    this.chat = new Chattin.Chat(this.socket, {});
    this.bindListeners();
  }

  ChatUi.prototype.bindListeners = function() {

    var that = this;

    this.socket.on("sendMessage", function(data){
      $("ul").prepend("<li>" + data.nickname + ": " + data.text + "</li>");
    });

    this.socket.on("nicknameChanged", function(data){
      $(".username").html(data.nickname);
      that.chat.nickname = data.nickname;
    })

    $("button.message-new").on("click", function(event){
      event.preventDefault();
      var msg = $("input.message-new").val();
      $("input.message-new").val("");
      that.chat.sendMessage(msg);
    });

    $("button.nickname-change").on("click", function(event){
      event.preventDefault();
      var nickname = $("input.nickname-change").val();
      that.chat.changeNickname(nickname);
    });
  };

})();

$(function() {
  var chatUi = new ChatUi();
});