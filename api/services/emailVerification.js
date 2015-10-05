/**
 * Created by Vincent on 11/08/2015.
 */
var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config.js');
var User = require('../models/user.js')


var model = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title:'TestJwt',
    subtitle: 'Thank for sign in!',
    body: 'Check your email by clicking on the button below'
};

exports.send = function(email)
{
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.EMAIL_SECRET);
    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'Smtp.gmail.com',
        secure: true,
        auth: {
            user: 'vincent.boudewyn@gmail.com',
            pass: config.EPASS
        }
    }));
    var mailOptions = {
        from: 'Accounts <vincent.boudewyn@gmail.com>',
        to: email,
        subject: 'Jwt Test Account Verification',

        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            return res.status(500, err);
        }
    })

};

exports.handler = function (req, res) {
    var token = req.query.token;

    var payload = jwt.decode(token, config.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) return handleError(res);

    User.findOne({
        email: email
    }, function (err, foundUser) {
        if (err) return res.status(500);

        if (!foundUser) return handleError(res);

        if (!foundUser.active)
            foundUser.active = true;

        foundUser.save(function (err) {
            if (err) return res.status(500);
            return res.redirect(config.APP_URL);
        })
    })
};

function getHtml(token){
    var path = ('./views/emailVerification.html');
    var html = fs.readFileSync(path, encoding = 'utf8');

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);

};

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

function handleError(res){
    return res.status(401).send("Authentication failed, enable to verify email");
}
