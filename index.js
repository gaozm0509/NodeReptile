var request = require('request');
var cheerio = require('cheerio');



function reptile() {
    return new Promise(function(resolve) {
        var url = 'https://bbs.hupu.com/bxj';
        request(url, function(err, res) {
            if (err) {
                console.log(err);
                return err;
            }
            var $ = cheerio.load(res.body.toString());
            //解析页面内容
            var dataList = [];
            $('.for-list li').each(function() {
                var titlelink = $(this).find('.titlelink');
                var authorBox = $(this).find('.author');

                var title = $(titlelink).find('.truetit').text();
                var href = $(titlelink).find('a').attr('href');
                var author = $(authorBox).find('.aulink').text();
                var time = $(authorBox).find('.aulink').next().next().text();
                var ansour = $(this).find('.ansour').text(); // 浏览数和回复数


                var data = {
                    title: title,
                    href: href,
                    author: author,
                    time: time,
                    ansour: ansour,
                    '分割线': '</br>'
                }
                dataList.push(data);

            })
            console.log(dataList);
            resolve(dataList);

        });
    })

}

module.exports = {
    reptile,
}