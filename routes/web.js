let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = 'Home buying platform';

  if (req.session.admin !== undefined) {
      res.locals.admin = req.session.admin;
  }

  res.render('index', { title, page:'Home', menuId:'home' });
});

router.get('/forrent', function(req, res, next) {
  const title = 'For rent';

  res.render('pages/rent', { title, page:'Rent', menuId:'rent' });
});

router.get('/forsale', function(req, res, next) {
  const title = 'For sale';

  res.render('pages/sale', { title, page:'Sale', menuId:'sale' });
});

router.get('/contact', function(req, res, next) {
  const title = 'Contact us';

  res.render('pages/contact', { title, page:'Contact', menuId:'contact' });
});

router.get('/detail/:slug', function(req, res, next) {
  const title = 'Detail page';

  res.render('pages/details', { title, page:'Detail', menuId:'detail' });
});

/**
 * Authentification
 */
router.get('/auth/login', function(req, res, next) {
    const title = 'Login';
    res.render('pages/login', { title, page:'Login', menuId:'detail' });
});

router.post('/auth/login', function(req, res, next) {
    if (req.body.username === undefined || req.body.password === undefined) {
        res.redirect('/auth/login');
    }

    if (req.session.users) {
        const registeredUsers = req.session.users;
        const userFilterFn = registeredUsers.filter((res) => {
            if (res.username === req.body.username && res.password === req.body.password) {
                return res;
            }
        });

        if (userFilterFn.length !== 0) {
            req.authenticated(true);

            if (req.session.admin === undefined) {
                req.session.admin = (userFilterFn[0].isAdmin);
                res.locals.admin = (userFilterFn[0].isAdmin);
            } else {
                res.locals.admin = req.session.admin;
            }

            res.redirect('/');
        } else {
            res.redirect('/auth/login');
        }
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/auth/register', function(req, res, next) {
    const title = 'Register';

    res.render('pages/register', { title, page:'Register', menuId:'detail' });
});

router.post('/auth/register', function(req, res, next) {
    if (req.body.fullName === undefined || req.body.username === undefined || req.body.password === undefined) {
        res.redirect('/auth/register');
    }

    let registeredUsers = req.session.users || [];
    const userFilterFn = registeredUsers.filter((res) => {
        if (res.username === req.body.username && res.password === req.body.password) {
            return res;
        }
    });

    if (userFilterFn.length === 0) {
        req.users(req.body);
        res.redirect('/auth/login');
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/auth/logout', function (req, res, next) {
    req.authenticated(false);
    req.session.admin = undefined;
    res.locals.admin = undefined;

    res.redirect('/');
});

/**
 * Add to cart
 */
router.post('/add/cart', function(req, res, next) {
  let cartContent = req.session.cart || [];

  cartContent.push(req.body);
  req.cart(cartContent);

  res.redirect('/');
});

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  const title = 'Shopping cart';
  res.render('pages/cart', { title, page:'Cart', menuId:'cart' });
});


module.exports = router;
