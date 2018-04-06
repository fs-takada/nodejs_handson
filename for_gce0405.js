const https = require('https');
const Compute = require('@google-cloud/compute');
const compute = new Compute();

const zone = compute.zone('asia-east1-a');
const vm = zone.vm('corporate-test');
const options = {
  host: 'stg.fullspeed.co.jp',
  rejectUnauthorized: false,
};

exports.auto_check_instance  = (req, res) => {
    https.get(options, (res) => {
      var statusCode = res.statusCode;
      console.log(`statuscode: ${statusCode}`);

      if (statusCode === 200) {
        console.log('完了しました');
      } else {
        console.log('内部エラーの可能性があります。再起動させます。');
        restart_instance();
        res.status(200).send('完了しました');
      };
      process.exit();
    }).on('error', (e) => {
      console.log('インスタンスかapacheが停止しています。インスタンスを起動します。');
      restart_instance();
    });
};

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
        }, 50000);
    });
}
