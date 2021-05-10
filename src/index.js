const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");

const { HttpError } = require("http-errors");

const middleware = require("./middleware");

const app = new Koa();

app.use(async (ctx, next) => {
    try {
        ctx.body = {};
        await next();
    } catch(e) {
        if(!(e instanceof HttpError)) { throw e; }
    }
});

app.use(koaBody());
app.use(middleware.getDB);

const router = new Router();
router.post("/vote", require("./vote/post.js"));
router.get("/vote", require("./vote/get.js"));

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT);

module.exports = server;
