const db = require('../mongodb/db');
const mongodb = require('mongodb');

module.exports.index = function (req, res) {
    res.render('cart/index.pug');
}

module.exports.submit = function (req, res) {
    res.render('cart/submit.pug');
}

module.exports.order = function (req, res) {
    var data = JSON.parse(req.body.data);
    var client = data.slice(data.length - 1, data.length);
    var order = data.slice(0, data.length - 1);
    var checked = false;
    var obj = { client: JSON.stringify(client), order: JSON.stringify(order), checked: JSON.stringify(checked) };
    var ordersCollection;
    db(db => {
        ordersCollection = db.collection('orders');
    });
    ordersCollection.insertOne(obj, function (err) {
        if (err)
            console.log(err);
    });
}