const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const dbName = process.env.MONGO_NAME || 'misabee';
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
let callback, db;

MongoClient.connect(url, mongoOptions, function (err, client) {
    if (err) throw err;
    console.log("Database connected!");
    db = client.db(dbName);
    callback(db);
});

module.exports = function (cb) {
    if (typeof db != 'undefined') {
        cb(db)
    } else {
        callback = cb
    }
}