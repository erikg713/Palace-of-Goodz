const jwtConfig = {
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRE || '15m',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
};

export default jwtConfig;
