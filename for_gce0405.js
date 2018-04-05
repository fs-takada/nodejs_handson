const https = require('https');
const Compute = require('@google-cloud/compute');
const compute = new Compute();

const zone = compute.zone('asia-east1-a');
const vm = zone.vm('xxx');
const options = {
  host: 'stg.xxx',
  rejectUnauthorized: false,
};


https.get(options, (res) => {

  var statusCode = res.statusCode;
  console.log(`statuscode: ${statusCode}`);

  if (statusCode === 200) {
    console.log('正常です');
  } else {
    console.log('インスタンスを再起動します。');
    //vm.start();
  };

}).on('error', (e) => {
  console.log('Error code:'+ console.error(e) + '\nインスタンスを起動します。');
  //インスタンスの状態を取得
  vm.getMetadata(function(err, metadata, apiResponse) {
    console.log(metadata.status);

    if (metadata.status !== 'TERMINATED') {
      vm.stop();
      setTimeout(() => {
        console.log('30秒たったよ')
      }, 30000);
    }
    vm.start();
  });

});
