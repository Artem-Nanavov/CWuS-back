"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../utils/hash");
var validEmail_1 = require("../utils/validEmail");
describe('hash test:', function () {
    test('can return string (random hash key)', function () {
        expect(typeof hash_1.hash(10)).toBe('string');
    });
    test('can return string (check length)', function () {
        expect(hash_1.hash(25).length).toBe(25);
    });
});
describe('validEmail test:', function () {
    var testValue = [
        '', ' ', 'a@', '@.', ' @. ', 'asdf', '@.com', ' @ . com', '|@sdf.com', '/|@sdfgs.com', '-_=+@adsf.com', '.....@.....com',
        '`"sdffsa@gms.com', '!///|||@.asfasfd', '123231231212@gmail. ', '123231231212@/|\.com', '!"№;%:?*()_+@sdf.com', '123231231212@-_+=.com',
        '()*&^%$#@!~@fsdgdf.com', '123231231212@gmail._-+=', '123231231212@.123123123', '123231231212@gmail./|\\', '123231231212@!"№;%:?*().com',
        'asdfasfdfas@sdfsdf.123123123', '123231231212@)(*&^%$#@!~.com', '123231231212@gmail.123123123', '123231231212@gmail.)(*&^%$#@!', '123231231212@gmail.!"№;%:?*()'
    ];
    test('can return false', function () {
        testValue.forEach(function (value) {
            expect(validEmail_1.validateEmail(value)).toBe(false);
        });
    });
    test('can return true', function () {
        expect(validEmail_1.validateEmail('sdfsadf@gmail.com')).toBe(true);
        expect(validEmail_1.validateEmail('123ddfsffg21@gmail.com')).toBe(true);
    });
});
