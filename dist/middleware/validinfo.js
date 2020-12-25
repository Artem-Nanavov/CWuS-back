"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
/**
 * Function for valid email
 *
 * @param { string } email
 * @return boolean
 */
exports.validateEmail = function (email) {
    var re = /^(([^<>-_+=!\\|/()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.-_=+,;!|:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
