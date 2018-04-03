//var jscafe = require('./create_module');
//var jscafe_message = require('./create_module2');

//console.log(jscafe.message);
//console.log(jscafe_message);


var jscafe_http = require('./module_http');

jscafe_http.request('http://atnd.org/events/37045', function(e, res) {
  if (e) { console.error(e); }
//  console.log(res);
});


var JSCafe = require('./module_http_emitter');
var jscafe = new JSCafe();

jscafe.request('http://atnd.org/events/37045');

jscafe.on('end', function(page) {
  console.log(page);
});
jscafe.on('error', function(e){
  console.log(e);
});
