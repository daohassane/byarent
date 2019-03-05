class LocalStorageService {
    /**
     * Sel Local storage
     *
     * @param key
     * @param value
     */
    static async setLocalStorage(key, value) {
        return await window.localStorage.setItem(key, value);
    }

    /**
     * Set local storage json
     *
     * @param key
     * @param value
     */
    static async setLocalStorageJson(key, value) {
        return await window.localStorage.setItem(key, JSON.parse(value));
    }

    /**
     * Get local storage
     *
     * @param key
     */
    static getLocalStorage(key) {
        return window.localStorage.getItem(key);
    }

    /**
     * Check has key
     *
     * @param key
     * @returns {boolean}
     */
    static localStorageHas(key) {
        return !!this.getLocalStorage(key);
    }
}

module.exports = LocalStorageService;
