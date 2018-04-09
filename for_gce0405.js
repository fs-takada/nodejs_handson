/* If an instance or apache is dropped, it will be automatically started */

const https = require('https');
const Compute = require('@google-cloud/compute');
const compute = new Compute();

const zone = compute.zone('asia-east1-a');
const vm = zone.vm('***');
const options = {
  host: '***',
  rejectUnauthorized: false,
};

exports.auto_check_instance = (req, res) => {

  https.get(options, (res) => {

    var statusCode = res.statusCode;
    console.log(`statuscode: ${statusCode}`);

    if (statusCode === 200) {
      console.log('正常です');
    } else {
      console.log('内部エラーが起きています。インスタンスを再起動させます。');
      restart_instance();
      res.end();
    };

  }).on('error', (e) => {
    console.log('apacheかインスタンスが停止している可能性があるのでインスタンスを起動します。');
    restart_instance();
    res.end();
  });

};

function restart_instance() {
  vm.getMetadata(function(err, metadata, apiResponse) {
    console.log(metadata.status);

    if (metadata.status !== 'TERMINATED') {
      vm.stop();
      setTimeout(() => {
        console.log('インスタンスを停止させました。')
        vm.start(function(err) {
          if (!err) console.log('インスタンスを起動させました。')
        });
      }, 30000);
    } else {
      vm.start(function(err) {
        if (!err) console.log('インスタンスを起動させました。')
      });
    }
  });
}
