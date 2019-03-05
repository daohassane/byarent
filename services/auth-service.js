class AuthenticatedService {

    static isAuthenticated(value) {
        return value === undefined;
    }

    static authenticated(value) {
        return value.authenticated(true);
    }
}

module.exports = AuthenticatedService;
