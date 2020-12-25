"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var db_config_1 = __importDefault(require("../configs/db.config"));
var pool = new pg_1.Pool(db_config_1.default);
exports.default = pool;
