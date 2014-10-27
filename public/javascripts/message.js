(function() {
  window.Ui = window.Ui || {};

  var Message = Ui.Message = function(options) {
    this.contents = options.contents;
    this.author = options.author;
    this.time = options.time;
    this.$el = options.$el || $("<li>");
  }

  Message.prototype.render = function () {
    console.log(this.time);
    var timePiece = '<div class="time">' + this.time + '</div>';
    var contentPiece = this.author + ": " + this.contents;
    this.$el.html(timePiece + contentPiece);
    return this;
  };

})();