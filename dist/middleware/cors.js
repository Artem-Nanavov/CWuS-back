"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
var allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
exports.corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
};
