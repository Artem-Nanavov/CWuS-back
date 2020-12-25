"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwtConfig = {
    access: {
        type: 'access_token',
        secret: 'secret_key',
    },
    refresh: {
        type: 'refresh_token',
        secret: 'secret_key',
        expiresIn: '7d',
    }
};
exports.default = jwtConfig;
