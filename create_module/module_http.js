var http = require('http');

var JSCafe = {
  request : function(url, callback) {
    http.get(url, function(res){
      res.setEncoding('utf-8');
      var buffer = '';
      res.on('readable', function(){
        buffer += res.read();
      });
      res.on('end', function() {
        callback(null, buffer);
        //レスポンスが帰って来たので、内容を第二引数に入れている。
      });
      res.on('error', function(e) {
        //第一引数には慣習的にエラーが入る。
        console.log('Got error: ' + e.message);
        callback(e, buffer);
      });
    });
  }
};

module.exports = JSCafe;
