﻿
var debug = require('debug');
var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var posts = require('./models/blogSchema');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogposts");

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
app.use(express.static(__dirname + '/public'));
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", function (req, res) {
    posts.find({}, function (err, allposts) {
        if (err) {
            res.status(err.status || 500);
            res.render('error.pug', {
                message: err.message,
                error: {}
            })
        } else {
            res.render('home', { posts: allposts });
        }
    });
    
});

app.get('/admin', function (req, res) {
    res.render("admin");
});
app.get('/newpost', function (req, res) {
    res.render("newposts");
});

app.post('/newpost', function (req, res) {
    posts.create(req.body.posts, function (err,allpost) {
        if (err) {
            res.status(err.status || 500);
            res.render('error.pug', {
                message: err.message,
                error: {}       })
                }  else {
            res.redirect('/admin');
        }
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.pug', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.pug', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('server started')
});
