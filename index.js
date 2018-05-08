var request = require('request');
var cheerio = require('cheerio');
var blockexplorer = require('blockchain.info/blockexplorer')

async function reptile(id, coin) {
    if (coin == 'ETH' || coin == 'EOS' || coin == 'OTB') {
        return await ethInfo(id);
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

function ethInfo(txid) {
    return new Promise(function(resolve) {
        var url = 'https://etherscan.io/tx/' + txid;
        request(url, function(err, res) {
            if (err) {
                console.log(err);
                resolve(err);
            }
            var data = {
                TxHash: '',
                TxReceiptStatus: '',
                BlockHeight: '',
                Confirmations: '',
                TimeStamp: '',
                From: '',
                To: '',
                Value: '',
                GasLimit: '',
                GasUsedByTxn: '',
                GasPrice: '',
                ActualTxCost_Fee: '',
                Nonce_Position: '',
                InputData: '',
            }
            var $ = cheerio.load(res.body.toString());
            // 解析页面数据
            var ContentPlaceHolder1_maintable = $('#ContentPlaceHolder1_maintable');
            $('.cbs').each(function(i) {
                if (i == 0) {
                    data.TxHash = $(this).text().replace(/(\n)/g, '');
                } else if (i == 1) {
                    data.TxReceiptStatus = $(this).text().replace(/(\n)/g, '');
                } else if (i == 2) {
                    data.BlockHeight = $(this).find('a').text().replace(/(\n)/g, '');
                    data.Confirmations = $(this).find('a').text().replace(/(\n)/g, '');
                } else if (i == 3) {
                    data.TimeStamp = $(this).text().replace(/(\n)/g, '');
                } else if (i == 4) {
                    data.From = $(this).text().replace(/(\n)/g, '');
                } else if (i == 5) {
                    data.To = $(this).text().replace(/(\n)/g, '');
                } else if (i == 6) {
                    data.Value = $(this).text().replace(/(\n)/g, '');
                } else if (i == 7) {
                    data.GasLimit = $(this).text().replace(/(\n)/g, '');
                } else if (i == 8) {
                    data.GasUsedByTxn = $(this).text().replace(/(\n)/g, '');
                } else if (i == 9) {
                    data.GasPrice = $(this).text().replace(/(\n)/g, '');
                } else if (i == 10) {
                    data.ActualTxCost_Fee = $(this).text().replace(/(\n)/g, '');
                } else if (i == 11) {
                    data.Nonce_Position = $(this).text().replace(/(\n)/g, '');
                } else {
                    data.InputData = $(this).find('span').find('textarea').val();
                }

            })

            console.log(data);
            resolve(data);
        })
    })
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