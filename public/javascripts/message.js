(function() {
  window.Ui = window.Ui || {};

  var Message = Ui.Message = function(options) {
    this.contents = options.contents;
    this.author = options.author;
    this.time = options.time;
    this.$el = options.$el || $("<li>");
  }

  Message.prototype.setAsMine = function () {
    this.$el.addClass("mine");
  };

  Message.prototype.render = function () {
    var time = '<div class="time">' + this.time + '</div>';
    var author = '<div class="author">' + this.author + '</div>';
    var contents = '<div class="contents">' + this.contents + "</div>";
    this.$el.html(time + author + contents);
    return this;
  };

})();