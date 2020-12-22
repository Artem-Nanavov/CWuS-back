const jwtConfig = {
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

export default jwtConfig;
