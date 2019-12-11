const db = require('../mongodb/db');
const mongodb = require('mongodb');

module.exports.isLogin = function (req, res, next) {
    if (req.signedCookies.mb_cdsue8dtf_yr) {
        db(db => {
            usersCollection = db.collection('users');
        });
        var id = req.signedCookies.mb_cdsue8dtf_yr;
        var o_id = new mongodb.ObjectID(id);
        usersCollection.findOne({ _id: o_id }, function (err, result) {
            if (err)
                console.log(err);
            else {
                res.locals.user = result;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}