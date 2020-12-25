"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./../logger/logger");
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database/database"));
var validinfo_1 = require("../middleware/validinfo");
var jwtGenerator_1 = require("../utils/jwtGenerator");
var express_1 = require("express");
var router = express_1.Router();
router.post('/reg', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, authData, _d, username, email, password, user, saltRound, salt, bcryptPassword, newUser, refresh, access, e_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 8, , 9]);
                _b = (_a = logger_1.logger).info;
                _c = ['reg data'];
                return [4 /*yield*/, req.header('Authorization')];
            case 1:
                _b.apply(_a, _c.concat([_e.sent()]));
                authData = req.header('Authorization');
                if (!authData || authData.trim() === '') {
                    return [2 /*return*/, res.status(401).json({
                            message: 'Values are incorrect',
                        })];
                }
                _d = JSON.parse(authData), username = _d.username, email = _d.email, password = _d.password;
                if (!validinfo_1.validateEmail(email)) {
                    return [2 /*return*/, res.status(403).send('Invalid email')];
                }
                return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE email = $1', [
                        email
                    ])];
            case 2:
                user = _e.sent();
                if (user.rows.length > 0) {
                    return [2 /*return*/, res.status(401).json({
                            message: 'User already exist',
                        })];
                }
                saltRound = 10;
                return [4 /*yield*/, bcrypt_1.default.genSalt(saltRound)];
            case 3:
                salt = _e.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 4:
                bcryptPassword = _e.sent();
                return [4 /*yield*/, database_1.default.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [
                        username,
                        email,
                        bcryptPassword
                    ])];
            case 5:
                newUser = _e.sent();
                return [4 /*yield*/, jwtGenerator_1.generateRefreshToken(newUser.rows[0]._id)];
            case 6:
                refresh = _e.sent();
                return [4 /*yield*/, jwtGenerator_1.generateAccessToken(newUser.rows[0]._id)];
            case 7:
                access = _e.sent();
                res.cookie('refresh', refresh, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                });
                return [2 /*return*/, res.status(200).json({
                        access: access,
                    })];
            case 8:
                e_1 = _e.sent();
                logger_1.logger.error('auth login error', e_1.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authData, _a, login, password, user, validPassword, refresh, access, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                logger_1.logger.info('login data', req.header('Authorization'));
                authData = req.header('Authorization');
                if (!authData || authData.trim() === '') {
                    return [2 /*return*/, res.status(401).json({
                            message: 'Values are incorrect',
                        })];
                }
                _a = JSON.parse(authData), login = _a.login, password = _a.password;
                if (!validinfo_1.validateEmail(login)) {
                    return [2 /*return*/, res.status(401).send('Invalid email')];
                }
                return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE email = $1', [
                        login
                    ])];
            case 1:
                user = _b.sent();
                if (user.rows.length === 0) {
                    return [2 /*return*/, res.status(401).json({
                            message: 'Values are incorrect',
                        })];
                }
                ;
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.rows[0].password)];
            case 2:
                validPassword = _b.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(401).json({
                            error: true,
                            message: 'Values are incorrect',
                        })];
                }
                ;
                return [4 /*yield*/, jwtGenerator_1.generateRefreshToken(user.rows[0]._id)];
            case 3:
                refresh = _b.sent();
                return [4 /*yield*/, jwtGenerator_1.generateAccessToken(user.rows[0]._id)];
            case 4:
                access = _b.sent();
                res.cookie('refresh', refresh, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                });
                res.status(200).json({
                    access: access
                });
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                logger_1.logger.error('auth login error', e_2.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 6];
            case 6:
                ;
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
