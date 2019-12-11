const db = require('../mongodb/db');
const mongodb = require('mongodb');

module.exports.requiredAuth = function (req, res, next) {
    if (!req.signedCookies.mb_cdsue8dtf_yr) {
        res.redirect('/auth/login');
        return;
    }
    var usersCollection;
    db(db => {
        usersCollection = db.collection('users');
    });
    var o_id = new mongodb.ObjectID(req.signedCookies.mb_cdsue8dtf_yr);
    usersCollection.findOne({ _id: o_id }, function (err, result) {
        if (err)
            console.log(err);
        else {
            if (!result)
                res.redirect('/auth/login');
            else
                next();
        }
    });
}