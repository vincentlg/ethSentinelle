var ethUtils = require('ethereumjs-util')
var https = require('https');

var checkBalance = function(i){
    var privateKey = new Buffer(array[i], 'hex');
    var address = ethUtils.privateToAddress(privateKey).toString('hex');
    
    var url = `https://api.etherscan.io/api?module=account&action=txlist&address=0x${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`;
    
    https.get(url, function(res){
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
        if(JSON.parse(body).status == "1")
        {
            // double-click on it while holding Cmd
            console.log(`Transactions here! check balance https://api.etherscan.io/api?module=account&action=balance&address=${address}`);
        }
            
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
}

var fs = require('fs');
var array = fs.readFileSync('keys.txt').toString().split("\n");
for(i in array) {
    checkBalance(i);
}
