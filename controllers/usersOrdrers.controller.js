const db = require('../mongodb/db');
const mongodb = require('mongodb');

module.exports.all = function (req, res) {
    var ordersCollecton;
    db(db => {
        ordersCollecton = db.collection('orders');
    });
    ordersCollecton.find({}).toArray(function (err, result) {
        if (err)
            throw err
        else {
            result.reverse();
            res.render('users/orders/all.pug', {
                products: result
            })
        }
    });
}

module.exports.unchecked = function (req, res) {
    res.render('users/orders/unchecked.pug');
}