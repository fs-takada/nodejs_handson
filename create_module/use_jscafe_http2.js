var JSCafe = require('./jscafe_http2');
var jscafe = new JSCafe();

jscafe.request('http://atnd.org/events/37045');

jscafe.on('end', function(page){
  console.log(page);
});

jscafe.on('error', function(e){
  console.error(e);
});
