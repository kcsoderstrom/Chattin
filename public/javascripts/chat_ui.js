(function() {

  var ChatUi = window.ChatUi = function() {
    this.socket = io();
    this.chat = new Chattin.Chat(this.socket, {});
    this.bindListeners();
  }

  ChatUi.prototype.bindListeners = function() {

    var that = this;

    this.socket.on("sendMessage", function(data){
      var msg = new Ui.Message(data);
      if(data.author === that.chat.nickname) {
        msg.setAsMine();
      }
      $("ul.dialog").append(msg.render().$el);
      $("main").scrollTop($("main").height());
    });

    this.socket.on("nicknameChanged", function(data){
      $(".username").html(data.nickname);
      that.chat.nickname = data.nickname;
    });

    this.socket.on("newNickname", function(data){
      var $li = $(".sidebar li:contains(" + data.oldNickname + ")");
      $li.html(data.newNickname);
    });

    this.socket.on("addUser", function(data){
      $("ul.people").append("<li>" + data.nickname + "</li>");
    });

    this.socket.on("updateUsers", function(data){
      $("ul.people").empty();

      data.users.forEach(function(nickname){
        $("ul.people").append("<li>" + nickname + "</li>");
      });
      console.log("I am here");
    });

    $("button.message-new").on("click", function(event){
      event.preventDefault();
      var msg = $("input.message-new").val();
      $("input.message-new").val("");
      that.chat.processInput(msg);
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