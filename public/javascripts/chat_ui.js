$(function() {
  var socket = io();
  var chat = new Chattin.Chat(socket, {});

  socket.on("sendMessage", function(data){
    $("ul").prepend("<li>" + data.text + "</li>");
  });

  $("button").on("click", function(event){
    event.preventDefault();
    var msg = $("input").val();
    chat.sendMessage(msg);
  });

});