import { hash } from "../utils/hash";
import { validateEmail } from "../utils/validEmail";

describe('hash test:', () => {
  test('can return string (random hash key)', () => {
    expect( typeof hash(10) ).toBe('string');
  });

  test('can return string (check length)', () => {
    expect( hash(25).length ).toBe(25);
  });
});

describe('validEmail test:', () => {
  const testValue: string[] = [
    '', ' ', 'a@', '@.', ' @. ', 'asdf', '@.com', ' @ . com', '|@sdf.com', '/|@sdfgs.com', '-_=+@adsf.com', '.....@.....com',
    '`"sdffsa@gms.com', '!///|||@.asfasfd', '123231231212@gmail. ', '123231231212@/|\.com', '!"№;%:?*()_+@sdf.com', '123231231212@-_+=.com',
    '()*&^%$#@!~@fsdgdf.com', '123231231212@gmail._-+=', '123231231212@.123123123', '123231231212@gmail./|\\', '123231231212@!"№;%:?*().com',
    'asdfasfdfas@sdfsdf.123123123', '123231231212@)(*&^%$#@!~.com', '123231231212@gmail.123123123', '123231231212@gmail.)(*&^%$#@!', '123231231212@gmail.!"№;%:?*()'
  ];

  test('can return false', () => {
    testValue.forEach((value: string) => {
      expect(validateEmail(value)).toBe(false);
    });
  });

  test('can return true', () => {
    expect(validateEmail('sdfsadf@gmail.com')).toBe(true);
    expect(validateEmail('123ddfsffg21@gmail.com')).toBe(true);
  });
});