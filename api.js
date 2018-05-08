const Koa = require('koa');
const request = require('request');
const koa_router = require('koa-router');

const index = require('./index');

const app = new Koa();

const router = new koa_router();

router.get('/index/:coin/:txid', async ctx => {
    var txid = ctx.params.txid;
    var coin = ctx.params.coin;
    var reulst = await index.reptile(txid, coin);
    ctx.body = reulst;
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('server start')
})