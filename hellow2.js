var http = require('http');
// requre: モジュール読み込みのためのグローバルモジュール

var server = http.createServer(function(req, res) {
  res.end("Hello world!!!");
});
//server.listen(3000);

//console.log('Server started, listening on : 3000');
//listenの処理が終わる前に出力される。
//非同期特性所以
// -> コールバックを使う

//server.listen(3000, function() {
//  console.log('Server started, listening on : 3000');
//});

//event emitterを使った場合
server.on('listening', function(){
  console.log('Server started, listening on : 3000');
});
server.listen(3000);
//listenイベントを受け取って、表示する
