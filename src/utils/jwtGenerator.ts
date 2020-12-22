  import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import jwtConfig from "../configs/jwt.config";

/**
 * Create User Access token
 *
 * @param { string } user_id
 * @return string
 */
const generateAccessToken = ( user_id: string ): string => {
  const payload = {
    user_id,
    type: jwtConfig.access.type,
  };

  return jwt.sign(payload, jwtConfig.access.secret);
};

/**
 * Generate User Refresh token
 *
 * @return { id: string, token: string }
 */
const generateRefreshToken = (user_id: string) => {
  const options = { expiresIn: jwtConfig.refresh.expiresIn };
  const payload = {
    token_id: uuidv4(),
    type: jwtConfig.refresh.type,
    user_id,
  };

  return jwt.sign(payload, jwtConfig.refresh.secret, options);
};

const parseAccessToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (e) {
    return null;
  }
};

export {
  parseAccessToken,
  generateAccessToken,
  generateRefreshToken,
};