$(function() {
  var socket = io();
  var chat = new Chattin.Chat(socket, {});

  socket.on("sendMessage", function(data){
    $("ul").prepend("<li>" + data.text + "</li>");
  });

  socket.on("nicknameChanged", function(data){
    $(".username").html(data.nickname);
  })

  $("button.message-new").on("click", function(event){
    event.preventDefault();
    var msg = $("input.message-new").val();
    chat.sendMessage(msg);
  });

  $("button.nickname-change").on("click", function(event){
    event.preventDefault();
    var nickname = $("input.nickname-change").val();
    chat.changeNickname(nickname);
  });

});