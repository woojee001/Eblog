/**
 * Created by Cyril on 13-10-26.
 * Routes File
 * List all routes here
 */

"use strict";

var user = require('../controller/user.js'),
    post = require('../controller/post.js'),
    file = require('../controller/file.js');
//    album= require('../controller/album.js');

module.exports = function (app) {
    app.all("*", post.all);
    app.get("/", post.index);
    app.get("/pages/:page", post.index);
    app.get("/tags/:tag",post.tag);
    app.get("/categories/:category",post.category);
    app.get("/u/:name", user.show);
    app.get("/u/:name/pages/:page", user.pages);
    app.get('/reg', checkNotLogin);
    app.get("/reg", user.getNew);
    app.post("/reg", checkNotLogin);
    app.post('/reg', user.postNew);
    app.get('/login', checkNotLogin);
    app.get('/login', user.getLogin);
    app.post("/login", checkNotLogin);
    app.post('/login', user.postLogin);
    app.get('/post/new', checkLogin);
    app.get('/post/new', post.getNew);
    app.post('/posts', checkLogin);
    app.post('/posts', post.postNew);
    app.get('/posts/:slug', post.show);
//    app.get('/albums',album.show);
    app.get('/logout', user.logout);
    app.get('/posts/:slug/edit', checkLogin);
    app.get('/posts/:slug/edit', post.getEdit);
    app.put('/posts', checkLogin);
    app.put('/posts', post.postEdit);
    app.delete('/post/:slug/delete', checkLogin);
    app.delete('/post/:slug/delete', post.getDelete);
    app.post('/upload', checkLogin);
    app.post('/upload', file.upload);
    function checkLogin(q,s,next){
        if (!q.session.user){
            q.flash("error","Login First!");
            s.redirect('/login')
        }
        next();
    }
    function checkNotLogin(q,s,next){
        if (q.session.user){
            q.flash("error","You've logged in");
            s.redirect('back')
        }
        next();
    }
};