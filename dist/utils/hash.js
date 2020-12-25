"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
/**
 * function for create hash text
 *
 * @param { string } len - max length for returns text
 * @returns { string }
 * @example
 * // hash( 5 ) => return 'A23fe'
 */
exports.hash = function (len) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
