var request = require('request');
var cheerio = require('cheerio');
var config = require('./config');
var api = require('etherscan-api').init(config.EHTApiKey);




async function reptile(id, coin, page) {
    if (coin == 'ETH' || coin == 'EOS' || coin == 'OTB') {
        return await ethInfo(id, page);
    } else if (coin == 'BTC') {
        return await btcInfo(id);
    }
}

function btcInfo(id) {
    var result = blockexplorer.getTx(id, null)
    console.log('result==================', result);
    return;
    return new Promise(function(resolve) {
        var url = 'https://blockchain.info/rawtx/' + id;
        request(url, function(err, res) {
            if (err) {
                console.log(err);
                resolve(err);
            } else {
                console.log(res.body);
                resolve(res.body);
            }
        })
    })
}


// 获取ETH的信息
function ethInfo(id, page) {
    return new Promise(function(resolve) {
        var url = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + id + '&startblock=0&endblock=99999999&page=' + page + '&offset=10&sort=asc&apikey=' + config.EHTApiKey;
        request(url, function(err, res, data) {
            if (!err) {
                console.log(data);
                resolve(data);
            } else {
                resolve(err);
            }
        });
        // request({
        //     url: url,
        //     method: "GET",
        //     json: true,
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     body: JSON.stringify(data)
        // }, function(res, err) {
        //     if (!err) {
        //         console.log(balanceData);
        //         resolve(balanceData.result);
        //     } else {
        //         resolve(err);
        //     }
        // });
        // var balance = api.account.txlist(id);
        // balance.then(function(balanceData) {
        //     console.log(balanceData);
        //     resolve(balanceData.result);
        // });
        // balance.catch(function(err) {
        //     resolve(err);
        // })
    });
}

// function reptile() {
//     return new Promise(function(resolve) {
//         var url = 'https://bbs.hupu.com/bxj';
//         request(url, function(err, res) {
//             if (err) {
//                 console.log(err);
//                 return err;
//             }
//             var $ = cheerio.load(res.body.toString());
//             //解析页面内容
//             var dataList = [];
//             $('.for-list li').each(function() {
//                 var titlelink = $(this).find('.titlelink');
//                 var authorBox = $(this).find('.author');

//                 var title = $(titlelink).find('.truetit').text();
//                 var href = $(titlelink).find('a').attr('href');
//                 var author = $(authorBox).find('.aulink').text();
//                 var time = $(authorBox).find('.aulink').next().next().text();
//                 var ansour = $(this).find('.ansour').text(); // 浏览数和回复数


//                 var data = {
//                     title: title,
//                     href: href,
//                     author: author,
//                     time: time,
//                     ansour: ansour,
//                     '分割线': '</br>'
//                 }
//                 dataList.push(data);

//             })
//             console.log(dataList);
//             resolve(dataList);

//         });
//     })

// }

module.exports = {
    reptile,
}