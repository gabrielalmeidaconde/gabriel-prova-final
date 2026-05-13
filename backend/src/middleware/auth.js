const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

const ROLES_CLAIM = 'https://courses-app.com/roles';

const checkRole = (role) => (req, res, next) => {
  const roles = req.auth?.payload[ROLES_CLAIM] || [];
  if (roles.includes(role)) {
    return next();
  }
  return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
};

module.exports = { checkJwt, checkRole };
