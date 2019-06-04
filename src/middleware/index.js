const { MongoClient } = require("mongodb");
const url = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PW
}@ds221115.mlab.com:21115/sshs-vote`;
let client = null;

(async () => {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log("Connected to DB");
})();

module.exports = {
    getDB: async (ctx, next) => {
        ctx.state.client = client;
        ctx.state.db = ctx.state.client.db("sshs-vote");
        ctx.state.collections = {};
        ctx.state.collections.students = ctx.state.db.collection("students");
        await next();
    }
};
