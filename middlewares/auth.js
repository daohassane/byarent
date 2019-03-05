module.exports = function (req, res, next) {
    /**
     * Check if authenticated exist
     */
    if (req.session.authenticated) {
        res.locals.authenticated = req.session.authenticated;
    }

    /**
     * Authenticate Request
     *
     * @param value
     */
    req.authenticated = function (value) {
        if (req.session.authenticated === undefined) {
            req.session.authenticated = false;
        }

        req.session.authenticated = value;
    };

    /**
     * Users
     *
     * @param content
     */
    req.users = function (content) {
        if (req.session.users === undefined) {
            req.session.users = [{
                fullName: 'Administrator', username: 'admin@admin.com', password: 'admin', isAdmin: true
            }]
        }

        req.session.users.push(content);
    };

    next();
};
