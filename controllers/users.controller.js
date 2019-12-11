const db = require('../mongodb/db');

module.exports.index = function (req, res) {
    res.render('users/index.pug');
}

module.exports.all = function (req, res) {
    var usersCollection;
    db(db => {
        usersCollection = db.collection('users');
    });
    usersCollection.find({}).toArray(function (err, result) {
        res.render('users/all.pug', {
            users: result,
            count: 0
       }) 
    });
}