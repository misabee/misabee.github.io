const db = require('../../mongodb/db');
const mongodb = require('mongodb');

module.exports.index = function (req, res) {
    var productsCollections;
    db(db => {
        productsCollections = db.collection('products');
    });
    productsCollections.find({}).toArray((err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result);
        }
    });
};

module.exports.getOneProduct = function (req, res) {
    var productsCollections;
    db(db => {
        productsCollections = db.collection('products');
    });
    var id = req.params.id;
    var o_id = new mongodb.ObjectID(id);
    productsCollections.findOne({ _id: o_id }, function (err, result) {
        if (err)
            console.log(err);
        else {
            res.json(result);
        }
    });
}

module.exports.paginationProducts = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 12;
    var pageEnd;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    var productsCollections;
    db(db => {
        productsCollections = db.collection('products');
    });
    productsCollections.find({}).toArray((err, result) => {
        if ((result.length) % perPage == 0) {
            pageEnd = parseInt((result.length) / perPage);
        }
        else {
            pageEnd = parseInt((result.length) / perPage) + 1;
        }

        if (err)
            console.log(err);
        else {
            result.reverse();
            var data = result.slice(start, end);
            data.push(pageEnd);
            res.json(data);
        }
    });
}

module.exports.create = function (req, res) {
    var newProduct = req.body;
    var productsCollections;
    db(db => {
        productsCollections = db.collection('products');
    });
    if (!Array.isArray(newProduct)) {
        productsCollections.insertOne(newProduct, function (err) {
            if (err)
                console.log(err);
            else {
                res.json(newProduct);
            }
        });
    }
    else {
        productsCollections.insertMany(newProduct, function (err, result) {
            if (err)
                console.log(err);
            else {
                res.json(newProduct);
            }
        });
    }
}

module.exports.deleteProduct = function (req, res) {    
    var productsCollections;
    db(db => {
        productsCollections = db.collection('products');
    });
    var id = req.params.id;
    var o_id = new mongodb.ObjectID(id);
    var chooseProduct = { _id: o_id };
    productsCollections.findOne({ _id: o_id }, function (err, result) {
        if (err)
            console.log(err);
        else {
            if (!result) {
                res.send('Product not found!');
            }
            else {
                productsCollections.deleteOne(chooseProduct, function (err, obj) {
                    if (err)
                        console.log(err);
                    else {
                        res.send('Deleted sucessfully product ' + id + '!');
                    }
                });
            }
        }
    });
};