const https = require('https');
const Compute = require('@google-cloud/compute');
const compute = new Compute();

const zone = compute.zone('');
const vm = zone.vm('');
const options = {
  host: '',
  rejectUnauthorized: false,
};

https.get(options, (res) => {

  var statusCode = res.statusCode;
  console.log(`statuscode: ${statusCode}`);

  if (statusCode === 200) {
    console.log('正常です');
  } else {
    console.log('インスタンスを再起動させます');
    restart_instance();
  };

}).on('error', (e) => {
  console.log('インスタンスを起動します。');
  restart_instance();
});

function restart_instance() {
    vm.getMetadata().then(function(data) {
        const metadata = data[0];
        console.log(metadata.status);

        if (metadata.status !== 'TERMINATED') {
            vm.stop(function(err, operation, apiResponse) {
                if (!err) console.log('インスタンスを停止させます');
            });
        }

        setTimeout(() => {
            vm.start(function(err, operation, apiResponse) {
                if (!err) {
                    console.log('インスタンスの起動に成功しました。');
                } else {
                    console.log('インスタンスの起動に失敗しました。');
                }
            });
      }, 60000);
    });

}
