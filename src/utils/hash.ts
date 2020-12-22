/**
 * function for create hash text
 *
 * @param { string } len - max length for returns text
 * @returns { string }
 * @example
 * // hash( 5 ) => return 'A23fe'
 */
export const hash = ( len: number ): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const charactersLength = characters.length;

  for ( let i = 0; i < len; i++ ) {
    result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
  }

  return result;
}