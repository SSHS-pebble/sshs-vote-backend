const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const nanoid = require("nanoid");
const { MongoClient } = require("mongodb");
const ora = require("ora");

const url = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PW
}@ds221115.mlab.com:21115/sshs-vote`;

const studentList = new Array(parseInt(process.env.STUDENT, 10)).fill().map(() => ({
    id: nanoid(8),
    vote: -1
}));

(async () => {
    const ttyCheckSpinner = ora("Checking if stdout is file...").start();
    if(!process.stdout.isTTY) { ttyCheckSpinner.succeed("Stdout is file!"); }
    else { ttyCheckSpinner.warn("Stdout is terminal, consider redirection."); }
    const DBSpinner = ora("Connecting to database...").start();
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    DBSpinner.succeed("Connected to database!");
    const insertSpinner = ora("Inserting ids to database...").start();
    const db = client.db("sshs-vote");
    const students = db.collection("students");
    await students.drop();
    await students.insertMany(studentList);
    insertSpinner.succeed("Inserted all generated ids!");
    const logSpinner = ora("Printing all ids to stdout!").start();
    studentList.forEach(val => {
        console.log(val.id);
    });
    logSpinner.succeed("Finished printing ids!");
    client.close();
})();
