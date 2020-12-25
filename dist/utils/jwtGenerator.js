"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.parseToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = require("uuid");
var jwt_config_1 = __importDefault(require("../configs/jwt.config"));
/**
 * Create User Access token
 *
 * @param { string } user_id
 * @return string
 */
var generateAccessToken = function (user_id) {
    var payload = {
        user_id: user_id,
        type: jwt_config_1.default.access.type,
    };
    return jsonwebtoken_1.default.sign(payload, jwt_config_1.default.access.secret);
};
exports.generateAccessToken = generateAccessToken;
/**
 * Generate User Refresh token
 *
 * @return { id: string, token: string }
 */
var generateRefreshToken = function (user_id) {
    var options = { expiresIn: jwt_config_1.default.refresh.expiresIn };
    var payload = {
        token_id: uuid_1.v4(),
        type: jwt_config_1.default.refresh.type,
        user_id: user_id,
    };
    return jsonwebtoken_1.default.sign(payload, jwt_config_1.default.refresh.secret, options);
};
exports.generateRefreshToken = generateRefreshToken;
var parseToken = function (token) {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (e) {
        return null;
    }
};
exports.parseToken = parseToken;
