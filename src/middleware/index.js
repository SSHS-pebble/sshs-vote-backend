const { MongoClient } = require("mongodb");
let client = null;

module.exports = {
    getDB: async (ctx, next) => {
        if(!client || !client.isConnected()) {
            client = await MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true });
            console.log("Database Connected");
        }
        ctx.state.client = client;
        ctx.state.db = ctx.state.client.db("Vote");
        ctx.state.collections = {};
        ctx.state.collections.students = ctx.state.db.collection("students");
        await next();
    }
};
