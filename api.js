const Koa = require('koa');
const request = require('request');
const koa_router = require('koa-router');

const index = require('./index');

const app = new Koa();

const router = new koa_router();

router.get('/index', async ctx => {
    var reulst = await index.reptile();
    ctx.body = reulst;
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('server start')
})