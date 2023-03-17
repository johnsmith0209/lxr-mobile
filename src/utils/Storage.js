import {
    CapacitorCookies
} from '@capacitor/core';

import {
    JWT_STORAGE_KEY,
    LANG_STORAGE_KEY,
    isMobileApp
} from '@/configs';

class Storage {
    constructor(key, defaultValue) {
        this.isMobileApp = isMobileApp;
        this.key = key;
        this.defaultValue = defaultValue;
        console.log({isMobileApp, key, defaultValue});
    }

    async getCookie() {
        const {
            [this.key]: value,
        } = await CapacitorCookies.getCookies();
        console.log(`get cookie from capacitor cookie ${this.key} = ${value}`);
        return value;
    }

    getLocalStorage() {
        console.log(`get cookie from localStroage ${this.key} = ${localStorage.getItem(this.key)}`);
        return localStorage.getItem(this.key);
    }

    async get() {
        return (this.isMobileApp ? this.getLocalStorage() : this.getCookie()) || this.defaultValue;
    }

    deleteCookie() {
        console.log(`delete cookie in capacitor cookie ${this.key}`);
        const date = new Date(new Date().setFullYear(1970)).toGMTString();
        document.cookie = `${this.key}= ; Expire= ${date}; path=/ ;`;
    }

    deleteLocalStorage() {
        console.log(`delete cookie in localStorage ${this.key}`);
        localStorage.removeItem(this.key);
    }

    async delete() {
        this.isMobileApp ? this.deleteLocalStorage() : this.deleteCookie();
    }

    setCookie(value) {
        console.log(`set cookie in capactior cookie ${this.key} = ${value}`);
        // do nothing, Browser or CapacitorHttp will take care of it.
    }

    setLocalStorage(value) {
        console.log(`set cookie in localStorage ${this.key} = ${value}`);
        localStorage.setItem(this.key, value);
    }

    async set(value) {
        if (value === undefined || value === null) {
            return;
        }
        this.isMobileApp ? this.setLocalStorage(value) : this.setCookie(value);
    }
}

export const jwtStorage = new Storage(JWT_STORAGE_KEY);
export const langStorage = new Storage(LANG_STORAGE_KEY, 'cmn_hans_cn');

