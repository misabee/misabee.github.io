const db = require('../mongodb/db');
var md5 = require('md5');

module.exports.login = function (req, res) {
    if (!req.signedCookies.mb_cdsue8dtf_yr) {
        res.render('auth/login.pug');
    }
    else
        res.redirect('/users');
}

module.exports.postLogin = function (req, res) {
    var username = req.body.username;
    var unhashedPassword = req.body.password;
    var errors = [];
    if (!username)
        errors.push("Tên đăng nhập trống!");
    if (!unhashedPassword)
        errors.push("Mật khẩu trống");
    
    if (errors.length) {
        res.render('auth/login', {
            errors: errors,
            value: req.body 
        });
    }
    else {
        var usersCollection;
        var password = md5(unhashedPassword);
        db(db => {
            usersCollection = db.collection('users');
        });
        usersCollection.findOne({ username: username }, function (err, result) {
            if (err)
                console.log(err);
            else {
                if (!result) {
                    res.render('auth/login.pug', {
                        errors: [
                            'Không tồn tại người dùng!'
                        ],
                        value: req.body
                    });
                    return;
                }

                if (password != result.password) {
                    res.render('auth/login.pug', {
                        errors: [
                            'Mật khẩu sai!'
                        ],
                        value: req.body
                    });
                    return;
                }
                res.cookie('mb_cdsue8dtf_yr', result._id, {
                    signed: true
                });
                res.redirect('/users')
            }
        });
    }
}

module.exports.create = function (req, res) {
    res.render('auth/create.pug');
}

module.exports.postCreate = function (req, res) {
    console.log(req.body);
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var rePassword = req.body.rePassword;

    var errors = [];
    if (!name)
        errors.push("Yêu cầu nhập tên!");
    if (!username)
        errors.push("Yêu cầu nhập tên đăng nhập!");
    if (!password)
        errors.push("Yêu cầu nhập mật khẩu!");
    else if (!rePassword)
        errors.push("Yêu cầu nhập lại mật khẩu!");
    else if (rePassword !== password)
        errors.push("Mật khẩu đã nhập không trùng nhau!");
    
    if (errors.length > 0) {
        res.render('auth/create.pug', {
            errors: errors,
            value: req.body
        });
    }
    else {
        var usersCollection;
        hashedPassword = md5(password);
        db(db => {
            usersCollection = db.collection('users');
        });
        var newUser = {
            name: name,
            username: username,
            password: hashedPassword
        };
        usersCollection.insertOne(newUser, function (err) {
            if (err)
                throw err;
            else {
                res.redirect('/users/all');
            }
        });
    }
}

module.exports.logout = function (req, res) {
    res.clearCookie('mb_cdsue8dtf_yr');
    res.redirect('/');
}