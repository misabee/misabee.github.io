const db = require('../mongodb/db');
const mongodb = require('mongodb');

module.exports.viewProduct = function(req, res) {
    var id = req.params.id;
    var o_id = new mongodb.ObjectID(id);
    var productsCollection;
    db(db => {
        productsCollection = db.collection('products');
    });
    productsCollection.findOne({ _id: o_id }, function (err, result) {
        if (err)
            console.log(err);
        else {
            res.render('products/view.pug', {
                product: result
            });
        }
    });
}