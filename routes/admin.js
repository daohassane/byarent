let express = require('express');
let router = express.Router();

let authenticatedService = require('../services/auth-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (authenticatedService.isAuthenticated(req.session.authenticated)) {
        res.redirect('/login')
    }


    res.render('admin/dashboard', { title: 'Dashboard', menuId:'dashboard' });
});

/**
 * Orders
 */
router.get('/orders', function(req, res, next) {
    if (authenticatedService.isAuthenticated(req.session.authenticated)) {
        res.redirect('/login')
    }

    res.render('admin/order', { title: 'Order', menuId:'order' });
});

/**
 * Articles
 */
router
    .get('/articles', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.render('admin/articles/index', { title: 'Articles', menuId:'articles' });
    })
    .get('/articles/create', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.render('admin/articles/create', { title: 'Create new article', menuId:'articles' });
    })
    .post('/articles/create', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.send('respond with a resource');
    })
    .get('/articles/:id', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.render('admin/articles/show', { title: 'View article', menuId:'articles' });
    })
    .get('/articles/:id/edit', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.render('admin/articles/edit', { title: 'Edit article', menuId:'articles' });
    })
    .put('/articles/:id/edit', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.send('respond with a resource');
    })
    .delete('/articles/:id/delete', function(req, res, next) {
        if (authenticatedService.isAuthenticated(req.session.authenticated)) {
            res.redirect('/login')
        }

        res.send('respond with a resource');
    });

module.exports = router;
