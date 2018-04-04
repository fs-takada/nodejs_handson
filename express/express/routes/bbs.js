var messages = [];
var bbs = function(req, res) {
  var message = req.body.message;
  if (message) messages.push(message); //messageがあったらmessageにpushするが、この前後のmessageは同じものなのか？
  res.render('bbs', { title: 'JSCafe', messages: messages });
};

module.exports = bbs;

//お手本の通りに書いたら「TypeError: Router.use() requires a middleware function but got a Object」が出てしまった
//このファイルの中でbbsモジュールを定義するようにした。

//add

var message = function(socket) {
  socket.on('message', function(message) {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
};

module.exports = message;
