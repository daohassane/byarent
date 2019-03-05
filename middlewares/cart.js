module.exports = function (req, res, next) {
    if (req.session.cart) {
        res.locals.cart = req.session.cart;
    }

    req.cart = function (content) {
        if (req.session.cart === undefined) {
            req.session.cart = [];
        }

        req.session.cart = content;
    };

    next();
};
